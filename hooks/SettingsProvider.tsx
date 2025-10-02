"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { SettingsContextType } from "@/types/SettingsContextType";
import { useAudio } from "./AudioProvider";

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const { audio } = useAudio();
  const [isUsingSlider, setIsUsingSlider] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const isUsingSliderLocalStorage = localStorage.getItem("isUsingSlider");
    if (isUsingSliderLocalStorage !== null) {
      setIsUsingSlider(isUsingSliderLocalStorage === "true");
    } else {
      setIsUsingSlider(false);
    }
  }, []);

  function toggleSlider() {
    const newValue = !isUsingSlider;
    setIsUsingSlider(newValue);
    localStorage.setItem("isUsingSlider", newValue.toString());
  }

  function toggleMute() {
    setIsMuted(!isMuted);
    if (audio) {
      audio.muted = !isMuted;
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        isMuted,
        isUsingSlider,
        toggleMute,
        toggleSlider,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
