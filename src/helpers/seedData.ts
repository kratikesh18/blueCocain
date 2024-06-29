"use server";
import mongoose from "mongoose";
import LyricsModel from "@/models/LyricsModel"; // Update with the correct path to your LyricsModel
import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import AlbumModel from "@/models/AlbumModel";

const artistSampledata = [
  {
    name: "John Doe",
    bio: "A famous artist known for his unique style in pop music. His debut album was a huge hit and he continues to captivate audiences worldwide.",
    genre: ["Pop"],
    debutDate: new Date("2000-01-01"),
    albums: [], // Add album ObjectIds if available
    songs: [], // Add song ObjectIds if available
  },
  {
    name: "Jane Smith",
    bio: "An indie artist with a soulful voice and deep lyrics. Jane has been a prominent figure in the indie music scene for over a decade.",
    genre: ["Indie"],
    debutDate: new Date("2010-05-15"),
    albums: [],
    songs: [],
  },
  {
    name: "The Rockers",
    bio: "A rock band that has dominated the charts with their electrifying performances and powerful songs. They have a loyal fan base and are known for their energetic live shows.",
    genre: ["Rock"],
    debutDate: new Date("1995-09-10"),
    albums: [],
    songs: [],
  },
  {
    name: "DJ Beatmaster",
    bio: "An electronic music producer and DJ known for his groundbreaking beats and collaborations with top artists. His music is a staple in clubs around the world.",
    genre: ["Electronic", "Dance"],
    debutDate: new Date("2015-06-20"),
    albums: [],
    songs: [],
  },
];

const albumSampleData = [
  {
    albumName: "Folklore",
    by: new mongoose.Types.ObjectId(),
    releaseDate: "2020-07-24T00:00:00.000Z",
    tracks: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
    ],
    genre: "Indie Folk",
  },
  {
    albumName: "fly by midnight",
    by: new mongoose.Types.ObjectId(),
    releaseDate: "2020-07-24T00:00:00.000Z",
    tracks: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
    ],
    genre: "EDM",
  },
];

const songsSampledata = [
  {
    songName: "Song 1",
    singer: new mongoose.Types.ObjectId(), // Replace with an actual ObjectId of an artist
    albumName: "Album 1",
    genre: "Genre 1",
    releaseDate: new Date("2021-01-01"),
    lyricsText: [
      { line: "First line of song 1", startTime: 0, endTime: 5 },
      { line: "Second line of song 1", startTime: 6, endTime: 10 },
    ],
    keywords: ["lover", "closer", "taylor"],
  },
  {
    songName: "Song 2",
    singer: new mongoose.Types.ObjectId(), // Replace with an actual ObjectId of an artist
    albumName: "Album 2",
    genre: "Genre 2",
    releaseDate: new Date("2022-01-01"),
    lyricsText: [
      { line: "First line of song 2", startTime: 0, endTime: 5 },
      { line: "Second line of song 2", startTime: 6, endTime: 10 },
    ],
    keywords: ["stay", "blank space", "perfect"],
  },
];

const sampleData = albumSampleData;
const modelName = AlbumModel;

const seedData = async () => {
  await dbConnect();

  const sampleLyrics = sampleData;

  try {
    await modelName.insertMany(sampleLyrics);
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    mongoose.connection.close();
  }
};

export default seedData;
