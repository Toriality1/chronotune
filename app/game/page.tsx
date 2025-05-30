"use client";

import GameWrapper from "@/components/GameWrapper";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const DynamicGameProvider = dynamic(
  () => import("@/hooks/GameProvider").then((mod) => mod.GameProvider),
  {
    ssr: false,
  }
);

export default function Page() {
  const searchParams = useSearchParams();
  const mockup = searchParams.get("mockup");
  return (
    <DynamicGameProvider useMockup={mockup !== null}>
      <GameWrapper />
    </DynamicGameProvider>
  );
}
