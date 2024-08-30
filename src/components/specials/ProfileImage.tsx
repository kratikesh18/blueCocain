import React, { ChangeEvent, useEffect, useState } from "react";
import CameraIcon from "../icons/CameraIcon";
import { Button } from "../ui/button";
import axios from "axios";
import { Session } from "next-auth";

interface FileUploadedType {
  fileUrl: string;
}

const ProfileImage = ({ session }: { session: Session }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileuploadResponse, setFileUploadResponse] =
    useState<FileUploadedType | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData);
      setFileUploadResponse(res.data);

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
    <div className="relative w-[10rem] h-[10rem] rounded-full overflow-clip  aspect-square bg-fuchsia-400 md:w-40 mx-auto">
      <div className="relative group">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
          <span className="flex flex-col items-center text-white">
            <CameraIcon />
            <span>Add Photo</span>
          </span>
        </div>

        <img
          src={imagePreviewUrl || "/default-profile.png"} // Fallback image if no profile image
          alt={`${session?.user.username}'s Image`}
          loading="lazy"
          className=" h-[10rem] w-[10rem] object-cover"
        />
      </div>

      {file && (
        <div className="flex justify-center mt-4">
          <Button onClick={handleSubmit}>Upload Image</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
