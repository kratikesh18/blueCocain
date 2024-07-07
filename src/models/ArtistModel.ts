import mongoose, { Schema, Document, Types } from "mongoose";

export interface Artist extends Document {
  name: string;
  songs: Types.ObjectId[];
  bio?: string;
  genre?: string[];
  debutDate?: Date;
  albums?: Types.ObjectId[]; // References to Album model if you have one
  keywords: string[];
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
    },
    songs: {
      type: [Schema.Types.ObjectId],
      ref: "Lyrics",
      required: false,
    },

    albums: {
      type: [Schema.Types.ObjectId],
      ref: "Album", // Reference to Album model if you have one
      required: false,
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
