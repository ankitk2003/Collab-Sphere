import { v2 as cloudinary } from 'cloudinary';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // bypass self-signed cert
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  agent: httpsAgent,
});

export default cloudinary;
