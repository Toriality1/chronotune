import Link from "next/link";
import NumberOfSongsButton from "../components/NumberOfSongsButton";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col h-screen justify-center text-center">
      <Image src="/favicon.ico" width={80} height={80} alt="logo" className="mx-auto mb-3" />
      <h1 className="text-4xl font-bold">Chronotune</h1>
      <p className="mb-4">Guess the release date of random songs!</p>
      <NumberOfSongsButton />
      <Link
        href="/game"
        className="bg-green-700 text-white px-4 py-2 rounded-lg mx-auto mt-8"
      >
        Continue with <span className="font-bold">Spotify</span>
      </Link>
    </div>
  );
}
