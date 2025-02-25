import mongoose, { Document, Schema } from "mongoose";

export interface Album extends Document {
  albumName: string;
  albumArt: string;
  by: Schema.Types.ObjectId[];
  releaseDate: Date;
  genre: string;
  tracks: Schema.Types.ObjectId[];
}

const AlbumSchema: Schema<Album> = new Schema(
  {
    albumName: {
      type: String,
      trim: true,
      required: [true, "AlbumName is required"],
    },
    albumArt: {
      type: String,
      trim: true,
      required: [true, "AlbumArt is required"],
    },
    by: {
      type: [Schema.Types.ObjectId],
      ref: "Artist",
      required: [true, "Artist is required"],
    },
    releaseDate: {
      type: Date,
      required: [true, "releaseDate is required"],
    },
    genre: {
      type: String,
      trim: true,
      required: [true, "genre is required"],
    },
    tracks: {
      type: [Schema.Types.ObjectId],
      ref: "Lyrics",
      default: [],
      required: [true, "tracks is required"],
    },
  },
  { timestamps: true }
);

AlbumSchema.pre("save", function (next) {
  console.log("first middleware");
  next();
});

const AlbumModel1 =
  mongoose.models.NewAlbum || mongoose.model<Album>("NewAlbum", AlbumSchema);

export default AlbumModel1;
