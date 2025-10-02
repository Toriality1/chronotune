"use client";

import { useState, useEffect } from "react";
import loadingMessages from "@/data/loadingMessages";

interface LoadingProps {
  color?: "blue" | "red" | "green"; // restrict to supported
}

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
};

export default function Loading({ color = "blue" }: LoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showIsLoading, setShowIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      setShowIsLoading(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div>loading</div>
    // <div className="m-auto py-2 px-4">
    //   <p
    //     className={`mb-1 py-2 px-4 text-3xl font-black ${colorClasses[color]}`}
    //   >
    //     <span className="mix-blend-difference">
    //       {loadingMessages[messageIndex]}
    //     </span>
    //   </p>
    //   {showIsLoading && <p className="text-xs">(It&apos;s loading)</p>}
    // </div>
  );
}
