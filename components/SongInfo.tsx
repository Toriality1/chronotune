import { useGameContext } from "@/hooks/GameProvider";

export default function SongInfo() {
  const { currentSong, color } = useGameContext();

  return (
    <div
      className={`z-10 h-18 bg-${color}-700 p-2 shadow-sm border-b-2 border-black/25`}
    >
      <h3 className="text-8xl lg:text-4xl font-black drop-shadow">
        {currentSong.year}
      </h3>
      <p className="opacity-75">
        <span className="font-bold">{currentSong.title}</span> -{" "}
        {currentSong.artist}
      </p>
    </div>
  );
}
