import { useGameContext } from "@/hooks/GameProvider";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SongDisplay() {
  const { isLoading, currentSong, isGuessing, isPlaying, togglePlayPause } =
    useGameContext();

  if (isLoading) return null;

  return (
    <>
      <div
        style={{
          backgroundImage: `url("${currentSong.image_url}")`,
        }}
        className={`absolute ${
          isGuessing && "blur-md"
        } bg-center bg-contain bg-no-repeat m-auto inset-0`}
      ></div>
      <div className="z-10 p-4 size-full flex justify-center items-center">
        {isGuessing && (
          <FontAwesomeIcon
            onClick={togglePlayPause}
            icon={isPlaying ? faPause : faPlay}
            size="5x"
            opacity={0.4}
            className="cursor-pointer"
            style={{
              stroke: "black",
              strokeWidth: "8px",
            }}
          />
        )}
      </div>
    </>
  );
}
