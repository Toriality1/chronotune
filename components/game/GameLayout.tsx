import { useGameContext } from "@/hooks/GameProvider";
import GameBox from "./GameBox";
import EndScreen from "./GameEndScreen";
import GameSettings from "./GameSettings";
import GuessWrapper from "./guess/GuessWrapper";
import SongDisplay from "./song/SongDisplay";
import SongInfo from "./song/SongInfo";

export default function GameLayout() {
  const { hasFinished, isGuessing } = useGameContext();

  return (
    <div className="flex flex-col items-middle text-center h-screen lg:w-1/2 lg:m-auto bg-black">
      <GameBox color={"red"}>
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
    </div>
  );
}
