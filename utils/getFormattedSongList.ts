import { Song } from "../types/Song";

export function getFormattedSong(song: any): Song {
  return {
    id: song.id,
    title: song.name,
    artist: song.artists[0].name,
    audio_url: song.preview_url,
    image_url: song.album.images[0].url,
    year: song.album.release_date.slice(0, 4),
    external_url: song.external_urls.spotify,
  };
}
