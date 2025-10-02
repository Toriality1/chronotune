"use client";

import GameLayout from "@/components/game/GameLayout";
import GameBox from "@/components/game/GameBox";
import SongInfo from "@/components/game/song/SongInfo";
import SongDisplay from "@/components/game/song/SongDisplay";
import GuessWrapper from "@/components/game/guess/GuessWrapper";
import GameSettings from "@/components/game/GameSettings";
import EndScreen from "@/components/game/GameEndScreen";
import { GameProvider } from "@/hooks/GameProvider";
import { AudioProvider } from "@/hooks/AudioProvider";
import { SettingsProvider } from "@/hooks/SettingsProvider";
import { Song } from "@/types/Song";

interface GameWrapperProps {
  numberOfSongs: number;
  songs?: Song[];
}

export default function GameWrapper({
  numberOfSongs,
  songs,
}: GameWrapperProps) {
  return (
    <AudioProvider initialSongs={songs} numberOfSongs={numberOfSongs}>
      <GameProvider>
        <SettingsProvider>
          <GameLayout />
        </SettingsProvider>
      </GameProvider>
    </AudioProvider>
  );
}
