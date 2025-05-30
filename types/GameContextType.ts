import { Song } from "./Song";

export type GameContextType = {
  isLoading: boolean;
  isPlaying: boolean;
  isGuessing: boolean;
  isMuted: boolean;
  isUsingSlider: boolean;
  isGuessValid: boolean;
  hasFinished: boolean;

  color: string;
  guessNumber: number;
  songs: Song[];
  currentSong: Song;
  audio: HTMLAudioElement | null;
  songScore: number;
  totalScore: number;

  togglePlayPause: () => void;
  toggleMute: () => void;
  toggleSlider: () => void;
  setGuessNumber: React.Dispatch<React.SetStateAction<number>>;
  guess: () => void;
  next: () => void;
};
