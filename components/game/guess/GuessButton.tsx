import { useGameContext } from "@/hooks/GameProvider";

export default function GuessButton() {
  const { isGuessValid, isGuessing, guess, next, color, songs } =
    useGameContext();

  const isHomePage = songs.length === 1;

  return (
    <button
      className={`basis-1/5 bg-${color}-700 text-white p-2 disabled:bg-gray-500`}
      onClick={isGuessing ? guess : isHomePage ? () => {} : next}
      disabled={!isGuessValid || (!isGuessing && isHomePage)}
    >
      {isGuessing ? "Guess" : isHomePage ? "Done!" : "Next"}
    </button>
  );
}
