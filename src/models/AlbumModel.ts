import mongoose, { Document, Schema } from "mongoose";

export interface Album extends Document {
  albumName: string;
  albumArt: string;
  tracks: Schema.Types.ObjectId[]; // References to Lyrics model
  by: Schema.Types.ObjectId; // Reference to the Artist model
  releaseDate: Date;
  genre: string;
  keywords?: string[];
}

const AlbumSchema: Schema<Album> = new Schema(
  {
    albumName: {
      type: String,
      required: true,
    },
    albumArt: {
      type: String,
      required: true,
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    tracks: {
      type: [Schema.Types.ObjectId],
      ref: "Lyrics",
      required: false,
    },
    genre: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const AlbumModel =
  (mongoose.models.Album as mongoose.Model<Album>) ||
  mongoose.model<Album>("Album", AlbumSchema);


  
export default AlbumModel;
