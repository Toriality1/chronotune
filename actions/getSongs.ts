"use server";
import clientPromise from "@/lib/mongodb";

export async function getSongs(numberOfSongs: number = 3) {
  try {
    const client = await clientPromise;
    const db = client.db("chronotune");
    const songs = await db
      .collection("songs")
      .find({})
      .limit(numberOfSongs)
      .toArray();

    return songs.map((song) => ({
        ...song,
        _id: song._id.toString(),
    }))
  } catch (error) {
    console.log(error);
  }
}
