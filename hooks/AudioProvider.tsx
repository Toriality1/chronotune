"use client";

import { Song } from "@/types/Song";
import { createContext, useState, useEffect, useContext } from "react";
import { AudioContextType } from "@/types/AudioContextType";
import { getSongs } from "@/actions/getSongs";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: React.ReactNode;
  numberOfSongs: number;
  initialSongs?: Song[]; // Use on homepage only
}

export function AudioProvider({
  children,
  numberOfSongs = 3,
  initialSongs,
}: AudioProviderProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [songs, setSongs] = useState<Song[]>(initialSongs || []);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    async function fetchSongs() {
      const songs = await getSongs();
      setSongs(songs);
    }
    setAudio(new Audio());
    if (initialSongs) return;
    fetchSongs();
  }, []);

  useEffect(() => {
    if (songs.length === 0) return;
    setAudio(new Audio());
  }, [songs]);

  useEffect(() => {
    if (songs.length > 0 && audio) {
      audio.src = songs[currentSongIndex].audio_url;
    }
  }, [songs, audio]);

  function togglePlayPause() {
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  }

  return (
    <AudioContext.Provider
      value={{
        audio,
        songs,
        currentSong,
        currentSongIndex,
        setCurrentSongIndex,
        togglePlayPause,
        setIsPlaying,
        isPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within a AudioProvider");
  }
  return context;
}
