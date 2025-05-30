"use client";

import { useState, useEffect } from "react";

export default function NumberOfSongsButton() {
  const [numOfSongs, setNumOfSongs] = useState(5);
  const options = [3, 5, 10];

  useEffect(() => {
    setNumOfSongs(Number(localStorage.getItem("numOfSongs")) || 5);
  }, []);

  function changeNumOfSongs() {
    const currentIndex = options.indexOf(numOfSongs);
    const nextIndex = (currentIndex + 1) % options.length;
    const newNumOfSongs = options[nextIndex];
    setNumOfSongs(newNumOfSongs);
    localStorage.setItem("numOfSongs", newNumOfSongs.toString());
  }

  return (
    <button
      className="rounded-xl bg-gray-700 mx-auto py-1 px-4 text-gray-400 hover:text-gray-200"
      onClick={changeNumOfSongs}
    >
      {numOfSongs} songs
    </button>
  );
}
