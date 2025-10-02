 "use client";

 import GameLayout from "@/components/game/GameLayout";
 import GameBox from "@/components/game/GameBox";
 import SongInfo from "@/components/game/song/SongInfo";
 import SongDisplay from "@/components/game/song/SongDisplay";
 import GuessWrapper from "@/components/game/guess/GuessWrapper";
 import GameSettings from "@/components/game/GameSettings";
 import Loading from "@/components/Loading";
 import EndScreen from "@/components/game/GameEndScreen";
 import { useGameContext } from "@/hooks/GameProvider";

 export default function Page() {
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
