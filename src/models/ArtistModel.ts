import mongoose, { Schema, Document, Types } from "mongoose";

export interface Artist extends Document {
  name: string;
  songs: Types.ObjectId[];
  bio: string;
  genre: string[];
  debutDate: Date;
  albums: Types.ObjectId[];
  artistProfileImage: string;
  keywords?: string[];
}

const ArtistSchema: Schema<Artist> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      required: false,
    },
    genre: {
      type: [String],
      trim: true,
      required: false,
    },
    debutDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    songs: {
      type: [Schema.Types.ObjectId],
      ref: "Lyrics",
      required: false,
    },
    albums: {
      type: [Schema.Types.ObjectId],
      ref: "Album",
      required: false,
    },
    keywords: {
      type: [String],
      required: false,
    },
    artistProfileImage: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ArtistModel =
  mongoose.models.Artist || mongoose.model<Artist>("Artist", ArtistSchema);

export default ArtistModel;
