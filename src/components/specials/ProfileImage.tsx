import React, { ChangeEvent, useEffect, useState } from "react";
import CameraIcon from "../icons/CameraIcon";
import { Button } from "../ui/button";
import axios from "axios";
import { Session } from "next-auth";
interface fileUploadedType {
  fileUrl: string;
}
const ProfileImage = ({ session }: { session: Session }) => {
  const [file, setFile] = useState<File | null>(null);

  const [fileuploadResponse, setfileuploadResponse] =
    useState<fileUploadedType | null>(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("printing the event ", e);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    try {
      const res = await axios.post("/api/upload", formData);
      setfileuploadResponse(res.data);
      console.log(fileuploadResponse);

      if (res.status === 200) {
        console.log("File uploaded successfully", res.data);
      } else {
        console.log("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setFile(null);
    }
  };
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get("/api/getProfileImage");
        setImagePreviewUrl(response.data.url.profileImage);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, [handleSubmit]);
  return (
    <div className="rounded-full w-1/3 md:w-[10rem] relative md:right-32">
      <div className="absolute opacity-0 hover:opacity-100">
        <div className="w-1/4 h-[10rem] relative flex justify-center items-center md:w-[10rem] bg-gray-500/60 rounded-full overflow-hidden ">
          <input
            type="file"
            className="bg-red-500 w-full h-full opacity-0 absolute "
            onChange={handleFileChange}
          />
          <span
            className="flex flex-col justify-center items-center text-gray-200
            "
          >
            <CameraIcon />
            Add Photo
          </span>
        </div>
      </div>

      <img
        src={imagePreviewUrl}
        alt={`${session?.user.username}'s Image`}
        loading="lazy"
        className=" rounded-full aspect-square object-cover scale-1500"
      />

      {file && (
        <div
          className="flex justify-center items-center mt-4
        "
        >
          <Button onClick={handleSubmit}>Upload Image</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
