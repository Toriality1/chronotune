"use client";

import { Song } from "@/types/Song";
import { createContext, useState, useEffect, useContext, useRef } from "react";
import { GameContextType } from "@/types/GameContextType";
import { fetchSongs, abort } from "@/api/fetchSongs";
import { CURRENT_YEAR, MINIMUM_YEAR } from "@/utils/constants";

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  useMockup: boolean;
  children: React.ReactNode;
}

function getRandomColor() {
  const colors = ["red", "green", "blue"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function GameProvider({ children, useMockup }: GameProviderProps) {
  const [color, setColor] = useState<string>(getRandomColor());
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(new Audio());
  const [isGuessing, setIsGuessing] = useState<boolean>(true);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [isUsingSlider, setIsUsingSlider] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [guessNumber, setGuessNumber] = useState<number>(1960);
  const [songScore, setSongScore] = useState<number>(0);
  const [numberOfSongs, setNumberOfSongs] = useState<number>(3);

  const currentSong = songs[currentSongIndex];
  const isGuessValid =
    guessNumber <= CURRENT_YEAR && guessNumber >= MINIMUM_YEAR;

  useEffect(() => {
    setNumberOfSongs(Number(localStorage.getItem("numOfSongs")) || 5);
    setAudio(new Audio());

    async function loadSongs() {
      await fetchSongs(numberOfSongs, useMockup).then((fetchedSongs) => {
        setSongs(fetchedSongs);
      });
    }

    loadSongs();

    const storedValue = localStorage.getItem("isUsingSlider");
    if (storedValue !== null) {
      setIsUsingSlider(storedValue === "true");
    } else {
      setIsUsingSlider(false);
    }
  }, []);

  useEffect(() => {
    if (songs.length === 0) return;
    setIsLoading(false);
    audio!.src = songs[currentSongIndex].audio_url;
  }, [songs]);

  useEffect(() => {
    setColor(getRandomColor());
  }, [currentSongIndex]);

  function toggleSlider() {
    const newValue = !isUsingSlider;
    setIsUsingSlider(newValue);
    localStorage.setItem("isUsingSlider", newValue.toString());
  }

  function toggleMute() {
    setIsMuted(!isMuted);
    if (audio) audio.muted = !audio.muted;
  }

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

  function finishGame() {
    setIsPlaying(false);
    console.log("Final score: " + totalScore);
    setHasFinished(true);
  }

  function next() {
    if (currentSongIndex === songs.length - 1) {
      finishGame();
      audio?.pause();
      setIsPlaying(false);
      setIsGuessing(false);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
      audio?.pause();
      if (audio) audio.src = songs[currentSongIndex + 1].audio_url;
      setIsPlaying(false);
      setGuessNumber(1960);
      setIsGuessing(true);
    }
  }

  function guess() {
    const yearInput = guessNumber;
    const yearCorrect = parseInt(songs[currentSongIndex].year);
    const yearDifference = Math.abs(yearInput - yearCorrect);
    const thisScore = 100 - Math.min(yearDifference * 2, 100);
    setSongScore(thisScore);
    setTotalScore(totalScore + thisScore);
    console.log("This score for the song is: " + thisScore);
    console.log("Total score is: " + totalScore);
    console.log(songs);
    setIsGuessing(false);
  }

  return (
    <GameContext.Provider
      value={{
        songs,
        isGuessValid,
        isLoading,
        isPlaying,
        isGuessing,
        isMuted,
        isUsingSlider,
        hasFinished,
        currentSong,
        color,
        guessNumber,
        audio,
        songScore,
        totalScore,
        togglePlayPause,
        toggleMute,
        toggleSlider,
        setGuessNumber,
        guess,
        next,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
}
