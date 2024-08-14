import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

export async function uploadToCloudinaryStream(
  buffer: Buffer,
  id: string
): Promise<string | undefined> {
  return new Promise((res, rej) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: id },
      (err, result?: UploadApiResponse) => {
        if (err) return rej(err);
        res(result?.url);
      }
    );
    const stream = Readable.from(buffer);
    stream.pipe(uploadStream);
  });
}
