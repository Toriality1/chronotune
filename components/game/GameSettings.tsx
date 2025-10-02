"use client";

import {
  faKeyboard,
  faSliders,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSettings } from "@/hooks/SettingsProvider";

export default function GameSettings() {
  const { isMuted, isUsingSlider, toggleSlider, toggleMute } = useSettings();

  return (
    <div className="z-10 flex justify-between p-2">
      <FontAwesomeIcon
        icon={isMuted ? faVolumeMute : faVolumeUp}
        size="xl"
        className="cursor-pointer"
        onClick={toggleMute}
      />
      <FontAwesomeIcon
        icon={isUsingSlider ? faKeyboard : faSliders}
        size="xl"
        className="cursor-pointer"
        onClick={toggleSlider}
      />
    </div>
  );
}
