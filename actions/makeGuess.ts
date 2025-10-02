import clientPromise from "@/lib/mongodb";

export async function makeGuess(id: string, guess: number) {
  const client = await clientPromise;
  const db = client.db("chronotune");
  const song = await db.collection("songs").findOne({ _id: id });

  if (!song) {
    throw new Error("Song not found");
  }


}
