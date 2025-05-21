import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import config from "../config";
import { IUploadedFile } from "../interfaces/file";
import streamifier from "streamifier";


cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY.CLOUDINARY_API_SECRET,
});

export const sendImageToCloudinary = async (
  file: IUploadedFile
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: file.originalname,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });
