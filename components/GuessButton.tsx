import { useGameContext } from "@/hooks/GameProvider";
import { CURRENT_YEAR, MINIMUM_YEAR } from "@/utils/constants";

export default function GuessButton() {
  const { isGuessValid, guessNumber, isGuessing, guess, next, color } =
    useGameContext();

  return (
    <button
      className={`basis-1/5 bg-${color}-700 text-white p-2 disabled:bg-gray-500`}
      onClick={isGuessing ? guess : next}
      disabled={!isGuessValid}
    >
      {isGuessing ? "Guess" : "Next"}
    </button>
  );
}
