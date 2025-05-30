"use client";

import SongDisplay from "./SongDisplay";
import { useGameContext } from "@/hooks/GameProvider";
import Loading from "./Loading";
import GuessWrapper from "./GuessWrapper";
import SongInfo from "./SongInfo";
import EndScreen from "./EndScreen";
import GameSettings from "./GameSettings";
import GameLayout from "./GameLayout";
import GameBox from "./GameBox";
import { useMemo } from "react";

export default function GameWrapper() {
  const { isLoading, hasFinished, color, isGuessing } = useGameContext();

  return (
    <GameLayout>
      {isLoading ? (
        <Loading color={color} />
      ) : (
        <GameBox color={color}>
          {!hasFinished ? (
            <>
              {isGuessing ? <GameSettings /> : <SongInfo />}
              <SongDisplay />
              <GuessWrapper />
            </>
          ) : (
            <EndScreen />
          )}
        </GameBox>
      )}
    </GameLayout>
  );
}
