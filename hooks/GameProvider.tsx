"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { GameContextType } from "@/types/GameContextType";
import { CURRENT_YEAR, MINIMUM_YEAR } from "@/utils/constants";
import getRandomColor from "@/utils/getRandomColor";
import { useAudio } from "./AudioProvider";

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: React.ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const {
    audio,
    songs,
    currentSong,
    currentSongIndex,
    isPlaying,
    setCurrentSongIndex,
    togglePlayPause,
    setIsPlaying,
  } = useAudio();

  const [color, setColor] = useState<string>(getRandomColor());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGuessing, setIsGuessing] = useState<boolean>(true);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [guessNumber, setGuessNumber] = useState<number>(1960);
  const [songScore, setSongScore] = useState<number>(0);

  const isGuessValid =
    guessNumber <= CURRENT_YEAR && guessNumber >= MINIMUM_YEAR;

  useEffect(() => {
    if (songs.length === 0) return;
    setIsLoading(false);
    if (audio) audio.src = songs[currentSongIndex].audio_url;
  }, [songs]);

  useEffect(() => {
    setColor(getRandomColor());
  }, [currentSongIndex]);

  function finishGame() {
    setHasFinished(true);
  }

  function next() {
    if (currentSongIndex === songs.length - 1) {
      finishGame();
      setIsGuessing(false);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
      if (audio) audio.src = songs[currentSongIndex + 1].audio_url;
      setGuessNumber(1960);
      setIsGuessing(true);
    }
    audio?.pause();
    setIsPlaying(false);
  }

  function guess() {
    const yearInput = guessNumber;
    const yearCorrect = parseInt(songs[currentSongIndex].year);
    const yearDifference = Math.abs(yearInput - yearCorrect);
    const thisScore = 100 - Math.min(yearDifference * 2, 100);
    setSongScore(thisScore);
    setTotalScore(totalScore + thisScore);
    setIsGuessing(false);
  }

  return (
    <GameContext.Provider
      value={{
        songs,
        isPlaying,
        currentSong,
        isGuessValid,
        isLoading,
        isGuessing,
        hasFinished,
        color,
        guessNumber,
        songScore,
        totalScore,
        setGuessNumber,
        togglePlayPause,
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
