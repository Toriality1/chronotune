"use server";

import * as cheerio from "cheerio";
import {
  MissingTokenError,
  FailedToCreateTokenError,
  MissingEnvironmentVariablesError,
} from "@/errors/SpotifyErrors";
import { Song } from "@/types/Song";
import { getFormattedSong } from "@/utils/getFormattedSongList";
import { generate } from "random-words";
import { mockup } from "@/data/mockup";

type Query = {
  word: string;
  year: number;
  offset: number;
};

const CURRENT_YEAR = new Date().getFullYear();
const MINIMUM_POPULARITY = 10;
const DEFAULT_NUMBER_OF_SONGS = 5;
const MAX_RETRIES = 30;
let token: string = "";

const abortController = new AbortController();
export async function abort() {
  abortController.abort();
}

export async function fetchSongs(
  numberOfSongs: number = DEFAULT_NUMBER_OF_SONGS,
  useMockup: boolean = true
): Promise<Song[]> {
  if (useMockup) return getMockupSongs(numberOfSongs);

  if (!token)
    try {
      token = await createToken();
    } catch (err) {
      throw err;
    }

  const randomSongs: Song[] = [];

  for (let i = 0; i < numberOfSongs; i++) {
    let retryCount = 0;
    let randomSong: Song | null = null;

    console.log(`Fetching song ${i + 1} of ${numberOfSongs}...`);

    while (retryCount < MAX_RETRIES) {
      try {
        const query: Query = {
          word: generate() as string,
          year: getRandomYear(),
          offset: getRandomOffset(),
        };

        const songs = await searchQuery(query);

        randomSong = songs[Math.floor(Math.random() * songs.length)];
        randomSong = getFormattedSong(randomSong);
        randomSongs.push(randomSong);

        console.log(
          `Found song ${i + 1} of ${numberOfSongs}: ${randomSong.title} by ${
            randomSong.artist
          }`
        );
        break;
      } catch (err) {
        if (err instanceof MissingTokenError) {
          throw err;
        }

        retryCount++;

        if (retryCount === MAX_RETRIES) {
          console.log("Failed to fetch song after 30 retries.");
          throw err;
        }
        console.log(
          `Failed to fetch song ${
            i + 1
          } of ${numberOfSongs} with error: ${err}. Retrying...`
        );
      }
    }
  }

  console.log(`Finished fetching ${numberOfSongs} songs.`);
  console.log(token);

  return randomSongs;
}

function getMockupSongs(numberOfSongs: number) {
  const songs: Song[] = mockup.map((song) => getFormattedSong(song));
  const randomSongs = songs
    .sort(() => Math.random() - 0.5)
    .slice(0, numberOfSongs);
  return randomSongs;
}

async function searchQuery(query: Query) {
  if (!token) throw new MissingTokenError();

  const fetchSongs = await fetch(
    `https://api.spotify.com/v1/search?q=${query.word}+year%3A${query.year}&type=track&limit=50&offset=${query.offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: abortController.signal,
    }
  );

  const data = await fetchSongs.json();

  if (fetchSongs.status !== 200) throw new Error("Failed to fetch songs");

  const items = data.tracks.items;
  const itemsWithMinimumPopularity = items.filter(
    (item) => item.popularity >= MINIMUM_POPULARITY
  );

  if (itemsWithMinimumPopularity.length === 0) {
    throw new Error(
      `No songs found with minimum popularity (Query: {q: ${query.word} y: ${query.year} o: ${query.offset}}).`
    );
  }

  try {
    for (const item of itemsWithMinimumPopularity) {
      const previewUrls = await getSpotifyLinks(item.external_urls.spotify);
      if (previewUrls.length > 0) {
        item.preview_url = previewUrls[0];
      }
    }
  } catch (err) {
    throw err;
  }

  const filteredItems = itemsWithMinimumPopularity.filter(
    (item) => item.preview_url
  );

  if (filteredItems.length === 0) {
    throw new Error(
      `No songs found with preview URLs (Query: {q: ${query.word} y: ${query.year} o: ${query.offset}}).`
    );
  }

  return filteredItems;
}

async function createToken(): Promise<string> {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new MissingEnvironmentVariablesError();
  }

  const fetchToken = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    signal: abortController.signal,
  });

  const data = await fetchToken.json();

  if (fetchToken.status !== 200) throw new FailedToCreateTokenError();

  return data.access_token;
}

function getRandomYear() {
  return Math.floor(Math.random() * (CURRENT_YEAR - 1920) + 1920);
}

function getRandomOffset() {
  return Math.floor(Math.random() * 20);
}

async function getSpotifyLinks(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const scdnLinks = new Set();

    $("*").each((i, element) => {
      const attrs = element.attribs;
      Object.values(attrs).forEach((value) => {
        if (value && value.includes("p.scdn.co")) {
          scdnLinks.add(value);
        }
      });
    });

    return Array.from(scdnLinks);
  } catch (error) {
    throw error;
  }
}
