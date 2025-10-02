import GuessButton from "./GuessButton";
import GuessInput from "./GuessInput";

export default function GuessWrapper() {
  return (
    <div className="h-20 lg:h-fit z-10 flex shadow-md border-t-2 border-black/25">
      <GuessInput />
      <GuessButton />
    </div>
  );
}
