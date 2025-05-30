"use client";

import { useState, useEffect } from "react";
import loadingMessages from "@/data/loadingMessages";

interface LoadingProps {
  color?: string;
}

export default function Loading({ color = "blue" }: LoadingProps) {
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [messageIndex, setMessageIndex] = useState(0);
  const [showIsLoading, setShowIsLoading] = useState(false);

  useEffect(() => {
    if (messageIndex === undefined) {
      setMessageIndex(Math.floor(Math.random() * loadingMessages.length));
    }

    const interval = setInterval(() => {
      setLoadingMessage(() => {
        const random = loadingMessages[messageIndex];
        const index = random.indexOf(loadingMessage) || 0;
        return random[(index + 1) % random.length];
      });
      setShowIsLoading(true);
      console.log("Loading...");
    }, 3000);

    return () => clearInterval(interval);
  }, [messageIndex, loadingMessage, loadingMessages]);

  return (
    <>
      <div className={`m-auto py-2 px-4`}>
        <p className={`mb-1 py-2 px-4 text-3xl font-black  bg-${color}-500`}>
          <span className="mix-blend-difference">{loadingMessage}</span>
        </p>
        {showIsLoading && <p className="text-xs">(It&apos;s loading)</p>}
      </div>
    </>
  );
}
