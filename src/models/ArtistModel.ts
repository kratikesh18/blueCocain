import mongoose, { Schema, Document, Types } from "mongoose";

export interface Artist extends Document {
  name: string;
  songs: Types.ObjectId[];
  bio?: string;
  genre?: string[];
  debutDate?: Date;
  albums?: Types.ObjectId[]; // References to Album model if you have one
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
    },
    genre: {
      type: [String],
      trim: true,
    },
    debutDate: {
      type: Date,
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lyrics",
      },
    ],
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album", // Reference to Album model if you have one
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ArtistModel =
  mongoose.models.Artist || mongoose.model<Artist>("Artist", ArtistSchema);

export default ArtistModel;
