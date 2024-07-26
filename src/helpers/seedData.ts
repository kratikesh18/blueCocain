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

const data = {
  _id: "66a3e171fc8650df8e4ec5c4",
  songName: "Tere Sang Yara",
  singer: {
    _id: "66a2915113f56b61ef7e908f",
    name: "Atif Aslam",
  },
  albumDetails: {
    _id: "66992dcbfb9c0f3c9be9d516",
    albumArt:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/rustom-et00035722-17-04-2017-17-54-27.jpg",
  },
  contributedBy: [
    {
      _id: "6687ee1d2077c6314bcf3d5a",
      username: "kartikesh",
    },
  ],
  albumName: "Rustom",
  genre: "Bollywood",
  releaseDate: "2016-08-07T00:00:00.000Z",
  keywords: [],
  readyToPulish: false,
  lyricsText: [
    {
      line: "Tere sang yaaara , Khush rang bahara",
      startTime: 0,
      endTime: 5,
      _id: "66a3e434fc8650df8e4ec5ee",
    },
    {
      line: "Tu raaat deewaani , mein zard sitara",
      startTime: 6,
      endTime: 10,
      _id: "66a3e434fc8650df8e4ec5ef",
    },
    {
      line: "[Music]",
      startTime: 11,
      endTime: 15,
      _id: "66a3e434fc8650df8e4ec5f0",
    },
    {
      line: "O karam khudaya hain , tujhse mujhse milaya hain",
      startTime: 16,
      endTime: 20,
      _id: "66a3e434fc8650df8e4ec5f1",
    },
    {
      line: "Tujh pe markar hi toh , Mujhe jeena aya hain",
      startTime: 21,
      endTime: 25,
      _id: "66a3e434fc8650df8e4ec5f2",
    },
    {
      line: "O tere sang yara, Khush rang bahara",
      startTime: 26,
      endTime: 30,
      _id: "66a3e434fc8650df8e4ec5f3",
    },
    {
      line: "Tu raat Deewani mein zard sitara",
      startTime: 31,
      endTime: 35,
      _id: "66a3e434fc8650df8e4ec5f4",
    },
    {
      line: "O tere sang yara, Khush rang bahara",
      startTime: 36,
      endTime: 40,
      _id: "66a3e434fc8650df8e4ec5f5",
    },
    {
      line: "Mein tera ho jau,  jo tu kar de ishara",
      startTime: 41,
      endTime: 45,
      _id: "66a3e434fc8650df8e4ec5f6",
    },
    {
      line: "[Music]",
      startTime: 46,
      endTime: 50,
      _id: "66a3e434fc8650df8e4ec5f7",
    },
    {
      line: "Kahi kisi bhi gali mei jaau mein, Teri khusboo se takrau mein",
      startTime: 51,
      endTime: 55,
      _id: "66a3e434fc8650df8e4ec5f8",
    },
    {
      line: "Har raat jo aata hain mujhe woh khwab tu",
      startTime: 56,
      endTime: 60,
      _id: "66a3e434fc8650df8e4ec5f9",
    },
    {
      line: "Tera mera milna dastoor hain tere hone se mujhmein noor hain",
      startTime: 61,
      endTime: 65,
      _id: "66a3e434fc8650df8e4ec5fa",
    },
    {
      line: "Mein hoon suna sa ek aasaman mehtaab tu",
      startTime: 66,
      endTime: 70,
      _id: "66a3e434fc8650df8e4ec5fb",
    },
    {
      line: "O karam khudaya hain, tujhe meine jo paya hain",
      startTime: 71,
      endTime: 75,
      _id: "66a3e434fc8650df8e4ec5fc",
    },
    {
      line: "Tujhpe marke hi toh ... mujhe jeena aya hain",
      startTime: 76,
      endTime: 80,
      _id: "66a3e434fc8650df8e4ec5fd",
    },
    {
      line: "O tere sang yara... khush rang bahara",
      startTime: 81,
      endTime: 85,
      _id: "66a3e434fc8650df8e4ec5fe",
    },
    {
      line: "Tu raat deewani mein zard sitara",
      startTime: 86,
      endTime: 90,
      _id: "66a3e434fc8650df8e4ec5ff",
    },
    {
      line: "O Tere sang yaara .. khush rang bahara",
      startTime: 91,
      endTime: 95,
      _id: "66a3e434fc8650df8e4ec600",
    },
    {
      line: "Na tere bin ab toh na jeena ganwara",
      startTime: 96,
      endTime: 100,
      _id: "66a3e434fc8650df8e4ec601",
    },
    {
      line: "Meine chhode hain baaki sare raste",
      startTime: 101,
      endTime: 105,
      _id: "66a3e434fc8650df8e4ec602",
    },
    {
      line: "Bas aaya hu tere paas re ... meri aankho mein tera naam hain pehchaan le",
      startTime: 106,
      endTime: 110,
      _id: "66a3e434fc8650df8e4ec603",
    },
    {
      line: "Sabkuch mere liye tere paak hain, sau baaton ki ek baat hain",
      startTime: 111,
      endTime: 115,
      _id: "66a3e434fc8650df8e4ec604",
    },
    {
      line: "Mein na jaunga kabhi tujhe chhodke yeh jaan le",
      startTime: 116,
      endTime: 120,
      _id: "66a3e434fc8650df8e4ec605",
    },
    {
      line: "O karam khudaya hain ... tera pyar jo paya hain",
      startTime: 121,
      endTime: 125,
      _id: "66a3e434fc8650df8e4ec606",
    },
    {
      line: "Tujpe marke hi toh ... mujhe jeena aya hain",
      startTime: 126,
      endTime: 130,
      _id: "66a3e434fc8650df8e4ec607",
    },
    {
      line: "O tere sang yara .. Khush rang bahara..",
      startTime: 131,
      endTime: 135,
      _id: "66a3e434fc8650df8e4ec608",
    },
    {
      line: "Tu raat deewani mein zard sitara",
      startTime: 136,
      endTime: 140,
      _id: "66a3e434fc8650df8e4ec609",
    },
    {
      line: "O tere sang yara Kush rang bahara",
      startTime: 141,
      endTime: 145,
      _id: "66a3e434fc8650df8e4ec60a",
    },
    {
      line: "Mein behta musafir , Tu thehra kinara...",
      startTime: 146,
      endTime: 150,
      _id: "66a3e434fc8650df8e4ec60b",
    },
  ],
};

const data2 = {
  "_id": { "$oid": "66a3e171fc8650df8e4ec5c4" },
  songName: "Tere Sang Yara",
  singer: {
    "$oid": "66a2915113f56b61ef7e908f",
  },
  albumDetails: {
    "$oid": "66992dcbfb9c0f3c9be9d516",
  },
  contributedBy: [
    {
      "$oid": "6687ee1d2077c6314bcf3d5a",
    },
  ],

  albumName: "Rustom",
  genre: "Bollywood",
  releaseDate: "2016-08-07T00:00:00.000Z",
  keywords: [],
  readyToPulish: false,
  lyricsText: [
    {
      line: "Tere sang yaaara , Khush rang bahara",
      startTime: 0,
      endTime: 5,
      _id: "66a3e434fc8650df8e4ec5ee",
    },
    {
      line: "Tu raaat deewaani , mein zard sitara",
      startTime: 6,
      endTime: 10,
      _id: "66a3e434fc8650df8e4ec5ef",
    },
    {
      line: "[Music]",
      startTime: 11,
      endTime: 15,
      _id: "66a3e434fc8650df8e4ec5f0",
    },
    {
      line: "O karam khudaya hain , tujhse mujhse milaya hain",
      startTime: 16,
      endTime: 20,
      _id: "66a3e434fc8650df8e4ec5f1",
    },
    {
      line: "Tujh pe markar hi toh , Mujhe jeena aya hain",
      startTime: 21,
      endTime: 25,
      _id: "66a3e434fc8650df8e4ec5f2",
    },
    {
      line: "O tere sang yara, Khush rang bahara",
      startTime: 26,
      endTime: 30,
      _id: "66a3e434fc8650df8e4ec5f3",
    },
    {
      line: "Tu raat Deewani mein zard sitara",
      startTime: 31,
      endTime: 35,
      _id: "66a3e434fc8650df8e4ec5f4",
    },
    {
      line: "O tere sang yara, Khush rang bahara",
      startTime: 36,
      endTime: 40,
      _id: "66a3e434fc8650df8e4ec5f5",
    },
    {
      line: "Mein tera ho jau,  jo tu kar de ishara",
      startTime: 41,
      endTime: 45,
      _id: "66a3e434fc8650df8e4ec5f6",
    },
    {
      line: "[Music]",
      startTime: 46,
      endTime: 50,
      _id: "66a3e434fc8650df8e4ec5f7",
    },
    {
      line: "Kahi kisi bhi gali mei jaau mein, Teri khusboo se takrau mein",
      startTime: 51,
      endTime: 55,
      _id: "66a3e434fc8650df8e4ec5f8",
    },
    {
      line: "Har raat jo aata hain mujhe woh khwab tu",
      startTime: 56,
      endTime: 60,
      _id: "66a3e434fc8650df8e4ec5f9",
    },
    {
      line: "Tera mera milna dastoor hain tere hone se mujhmein noor hain",
      startTime: 61,
      endTime: 65,
      _id: "66a3e434fc8650df8e4ec5fa",
    },
    {
      line: "Mein hoon suna sa ek aasaman mehtaab tu",
      startTime: 66,
      endTime: 70,
      _id: "66a3e434fc8650df8e4ec5fb",
    },
    {
      line: "O karam khudaya hain, tujhe meine jo paya hain",
      startTime: 71,
      endTime: 75,
      _id: "66a3e434fc8650df8e4ec5fc",
    },
    {
      line: "Tujhpe marke hi toh ... mujhe jeena aya hain",
      startTime: 76,
      endTime: 80,
      _id: "66a3e434fc8650df8e4ec5fd",
    },
    {
      line: "O tere sang yara... khush rang bahara",
      startTime: 81,
      endTime: 85,
      _id: "66a3e434fc8650df8e4ec5fe",
    },
    {
      line: "Tu raat deewani mein zard sitara",
      startTime: 86,
      endTime: 90,
      _id: "66a3e434fc8650df8e4ec5ff",
    },
    {
      line: "O Tere sang yaara .. khush rang bahara",
      startTime: 91,
      endTime: 95,
      _id: "66a3e434fc8650df8e4ec600",
    },
    {
      line: "Na tere bin ab toh na jeena ganwara",
      startTime: 96,
      endTime: 100,
      _id: "66a3e434fc8650df8e4ec601",
    },
    {
      line: "Meine chhode hain baaki sare raste",
      startTime: 101,
      endTime: 105,
      _id: "66a3e434fc8650df8e4ec602",
    },
    {
      line: "Bas aaya hu tere paas re ... meri aankho mein tera naam hain pehchaan le",
      startTime: 106,
      endTime: 110,
      _id: "66a3e434fc8650df8e4ec603",
    },
    {
      line: "Sabkuch mere liye tere paak hain, sau baaton ki ek baat hain",
      startTime: 111,
      endTime: 115,
      _id: "66a3e434fc8650df8e4ec604",
    },
    {
      line: "Mein na jaunga kabhi tujhe chhodke yeh jaan le",
      startTime: 116,
      endTime: 120,
      _id: "66a3e434fc8650df8e4ec605",
    },
    {
      line: "O karam khudaya hain ... tera pyar jo paya hain",
      startTime: 121,
      endTime: 125,
      _id: "66a3e434fc8650df8e4ec606",
    },
    {
      line: "Tujpe marke hi toh ... mujhe jeena aya hain",
      startTime: 126,
      endTime: 130,
      _id: "66a3e434fc8650df8e4ec607",
    },
    {
      line: "O tere sang yara .. Khush rang bahara..",
      startTime: 131,
      endTime: 135,
      _id: "66a3e434fc8650df8e4ec608",
    },
    {
      line: "Tu raat deewani mein zard sitara",
      startTime: 136,
      endTime: 140,
      _id: "66a3e434fc8650df8e4ec609",
    },
    {
      line: "O tere sang yara Kush rang bahara",
      startTime: 141,
      endTime: 145,
      _id: "66a3e434fc8650df8e4ec60a",
    },
    {
      line: "Mein behta musafir , Tu thehra kinara...",
      startTime: 146,
      endTime: 150,
      _id: "66a3e434fc8650df8e4ec60b",
    },
  ],
};
