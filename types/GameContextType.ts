import { Song } from "./Song";

export type GameContextType = {
  isLoading: boolean;
  isGuessing: boolean;
  isGuessValid: boolean;
  isPlaying: boolean;
  hasFinished: boolean;
  color: string;
  guessNumber: number;
  songScore: number;
  totalScore: number;

  songs: Song[];
  currentSong: Song;

  setGuessNumber: React.Dispatch<React.SetStateAction<number>>;
  togglePlayPause: () => void;
  guess: () => void;
  next: () => void;
};
