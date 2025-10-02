"use client";

import { AudioProvider } from "@/hooks/AudioProvider";
import { GameProvider } from "@/hooks/GameProvider";
import { SettingsProvider } from "@/hooks/SettingsProvider";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AudioProvider>
      <GameProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </GameProvider>
    </AudioProvider>
  );
}
