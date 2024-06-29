import mongoose, { Document, Schema } from "mongoose";

export interface Album extends Document {
  albumName: string;
  by: Schema.Types.ObjectId; // Reference to the Artist model
  releaseDate: Date;
  tracks: Schema.Types.ObjectId[]; // References to Lyrics model
  genre?: string;
}

const AlbumSchema: Schema<Album> = new Schema({
  albumName: {
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
  tracks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lyrics",
      required: true,
    },
  ],
  genre: {
    type: String,
    required: false,
  },
});

const AlbumModel =
  (mongoose.models.Album as mongoose.Model<Album>) ||
  mongoose.model<Album>("Album", AlbumSchema);

export default AlbumModel;
