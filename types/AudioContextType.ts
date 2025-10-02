import { Song } from "./Song";

export type AudioContextType = {
  audio: HTMLAudioElement | null;
  songs: Song[];
  currentSong: Song;
  currentSongIndex: number;
  isPlaying: boolean;

  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  togglePlayPause: () => void;
  setCurrentSongIndex: React.Dispatch<React.SetStateAction<number>>;
};
