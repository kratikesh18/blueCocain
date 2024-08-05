import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to convert buffer to data URI
const bufferToDataUri = (buffer: Buffer, mimetype: string) => {
  const base64 = buffer.toString("base64");
  return `data:${mimetype};base64,${base64}`;
};

// Uploading the file to Cloudinary
const uploadFileToCloud = async (buffer: Buffer, mimetype: string) => {
  try {
    const dataUri = bufferToDataUri(buffer, mimetype);
    const response = await cloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
    });
    // File is uploaded to Cloudinary
    console.log("File uploaded:", response.url);
    return response;
  } catch (error: any) {
    console.log("Error uploading to Cloudinary:", error.message);
    return null;
  }
};

export { uploadFileToCloud };
