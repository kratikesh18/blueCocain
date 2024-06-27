import mongoose, { Schema, Types, Document } from "mongoose";

// Define the LyricsLine interface
interface LyricsLine {
  line: string;
  startTime: number; // Start time in seconds
  endTime: number; // End time in seconds
}

// Define the Lyrics interface
export interface Lyrics extends Document {
  songName: string;
  artist: Types.ObjectId; // Reference to the Artist model
  albumName?: string;
  genre?: string;
  releaseDate?: Date;
  lyricsText: LyricsLine[];
  keywords: string[];
}

// Create the LyricsLine schema
const LyricsLineSchema: Schema<LyricsLine> = new Schema({
  line: {
    type: String,
    required: true,
    trim: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
});

// Create the Lyrics schema
const LyricsSchema: Schema<Lyrics> = new Schema(
  {
    songName: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    albumName: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    releaseDate: {
      type: Date,
    },
    lyricsText: {
      type: [LyricsLineSchema],
      required: true,
    },
    keywords: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Lyrics model
const LyricsModel =
  (mongoose.models.Lyrics as mongoose.Model<Lyrics>) ||
  mongoose.model<Lyrics>("Lyrics", LyricsSchema);

export default LyricsModel;
