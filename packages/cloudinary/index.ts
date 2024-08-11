import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
});

// Upload an image
const uploadResult = await cloudinary.uploader
  .upload('test1.jpg', {
    public_id: 'test_picture'
  })
  .catch((error) => {
    console.log(error);
  });

console.log(uploadResult);

// // Optimize delivery by resizing and applying auto-format and auto-quality
// const optimizeUrl = cloudinary.url('shoes', {
//   fetch_format: 'auto',
//   quality: 'auto'
// });

// console.log(optimizeUrl);

// // Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url('shoes', {
//   crop: 'auto',
//   gravity: 'auto',
//   width: 500,
//   height: 500
// });

// console.log(autoCropUrl);
