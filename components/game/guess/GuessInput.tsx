"use client";

import { useGameContext } from "@/hooks/GameProvider";
import { useSettings } from "@/hooks/SettingsProvider";
import { useEffect, useRef, useState } from "react";

const CURRENT_YEAR = new Date().getFullYear();

export default function uessInput() {
  const { isGuessValid, isGuessing, setGuessNumber, songScore, guessNumber } =
    useGameContext();
  const { isUsingSlider } = useSettings();
  const [sliderPosition, setSliderPosition] = useState<Number>(0);

  const colors = {
    veryBad: "bg-red-400",
    bad: "bg-red-300",
    okay: "bg-yellow-200",
    good: "bg-green-300",
    veryGood: "bg-green-400",
  };

  function getColor() {
    if (songScore < 25) return colors.veryBad;
    if (songScore < 50) return colors.bad;
    if (songScore < 75) return colors.okay;
    if (songScore < 100) return colors.good;
    if (songScore == 100) return colors.veryGood;
  }

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sliderPosition === 0 && isUsingSlider && timelineRef.current) {
      setSliderPosition(() => {
        if (timelineRef.current) {
          const sizeOfTimeline = timelineRef.current.offsetWidth;
          const centerOfTimeline = sizeOfTimeline / 2;
          return centerOfTimeline;
        }
        return 0;
      });
    }
  }, [isUsingSlider, timelineRef]);

  useEffect(() => {
    if (isUsingSlider) {
      const { minX, maxX } = getSliderSize();
      const year = guessNumber;
      const clampedYear = Math.max(1920, Math.min(CURRENT_YEAR, year));

      const totalYears = CURRENT_YEAR - 1920;
      const relativeYear = clampedYear - 1920;
      const position = (relativeYear / totalYears) * maxX;

      const clampedPos = Math.max(0, Math.min(maxX, position));

      setSliderPosition(clampedPos);
    }
  }, [isUsingSlider, guessNumber]);

  function handleSliderStart(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) {
    if (e.type == "touchstart") {
      timelineRef.current?.addEventListener("touchmove", (e) => {
        handleSliderMove(e.touches[0]);
      });
      timelineRef.current?.addEventListener("touchend", (e) => {
        handleSliderStop(e.touches[0]);
      });
    } else {
      window.document.addEventListener("mousemove", handleSliderMove);
      window.document.addEventListener("mouseup", handleSliderStop);
    }
  }

  function handleSliderStop(e: TouchEvent | MouseEvent | Touch) {
    window.document.removeEventListener("mousemove", handleSliderMove);
    window.document.removeEventListener("mouseup", handleSliderStop);
    timelineRef.current?.removeEventListener(
      "touchmove",
      handleSliderMove as EventListener,
    );
    timelineRef.current?.removeEventListener(
      "touchend",
      handleSliderStop as EventListener,
    );
  }

  function getSliderSize() {
    if (!sliderRef.current || !timelineRef.current)
      return { minX: 0, maxX: 0, sliderWidth: 0 };
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderWidth = sliderRect.width;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const minX = timelineRect.left - sliderWidth / 2;
    const maxX = timelineRect.width - sliderWidth / 2;

    return { minX, maxX, sliderWidth };
  }

  function handleSliderMove(e: MouseEvent | Touch) {
    if (isUsingSlider && sliderRef.current && timelineRef.current) {
      const { minX, maxX, sliderWidth } = getSliderSize();

      const pos = e.clientX - minX - sliderWidth;
      const clampedPos = Math.max(0, Math.min(maxX, pos));

      const year =
        Math.round(((CURRENT_YEAR - 1920) * clampedPos) / maxX) + 1920;
      const clampedYear = Math.max(1920, Math.min(CURRENT_YEAR, year));

      setSliderPosition(clampedPos);
      setGuessNumber(clampedYear);
    }
  }

  return (
    <>
      {isGuessing ? (
        isUsingSlider ? (
          <div
            className="flex justify-center align-middle flex-grow bg-white p-2"
            style={{ touchAction: "none" }}
          >
            <div
              ref={timelineRef}
              className="m-auto flex-grow h-4 bg-gray-400 relative"
              onMouseDown={handleSliderStart}
              onTouchStart={(e) => {
                e.preventDefault();
                handleSliderStart(e);
              }}
            >
              <div
                ref={sliderRef}
                className="absolute bg-black h-8 w-8 left-1/2 -top-1/2 rounded-full cursor-pointer"
                style={{ left: `${sliderPosition}px` }}
              >
                <div
                  className="absolute bg-black p-2 text-sm select-none"
                  style={{ transform: "translate(-20%, -125%)" }}
                >
                  {guessNumber}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <input
            key="input"
            placeholder={guessNumber.toString()}
            onChange={(e) => setGuessNumber(Number(e.target.value))}
            className={
              `bg-white text-black text-center flex-grow` +
              (isGuessValid ? " " : " text-red-500")
            }
          />
        )
      ) : (
        <div className={`flex text-center flex-grow ${getColor()}`}>
          <p className="m-auto font-black text-black/40">{songScore} pts.</p>
        </div>
      )}
    </>
  );
}
