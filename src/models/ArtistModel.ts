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
      trim: true,
      required: [true, "Artist Name is required"],
    },
    bio: {
      type: String,
      trim: true,
      required: [true, "Bio of Artist is Required"],
    },
    artistProfileImage: {
      type: String,
      required: [true, "Artist Profile is Required"],
      default: "",
    },
    genre: {
      type: [String],
      trim: true,
      required: [true, "Genre is Required"],
    },
    debutDate: {
      type: Date,
      default: Date.now(),
      required: [true, "DebuteDate is required"],
    },
    songs: {
      type: [Schema.Types.ObjectId],
      ref: "Lyrics",
      required: [true, "Songs are Required for Artist Profile"],
      default: [],
    },
    albums: {
      type: [Schema.Types.ObjectId],
      ref: "Album",
      default: [],
      required: [true, "Album is required for Artist Profile"],
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



const ArtistModel =
  mongoose.models.Artist || mongoose.model<Artist>("Artist", ArtistSchema);

export default ArtistModel;
