import mongoose, { Schema, Types } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  // isVerified: boolean;
  // userType: string;
  contributedLyrics?: Types.ObjectId[];
  profileImage: string;
  spotifyAccessToken:string,
  spotifyRefreshToken:string,
}
const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "please use valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
      default: "",
    },
    contributedLyrics: {
      type: [Types.ObjectId],
      ref: "Lyrics",
      required: false,
      default: [],
    },
    spotifyAccessToken:{
      type:String
    },
    spotifyRefreshToken:{
      type:String
    }

    // password: { type: String, required: true },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // userType: {
    //   type: String,
    //   enum: ["artist", "user"],
    //   required: true,
    // },
   
  },
  { timestamps: true , strict:true}
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
