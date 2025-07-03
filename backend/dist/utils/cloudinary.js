"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const httpsAgent = new https_1.default.Agent({
    rejectUnauthorized: false, // bypass self-signed cert
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    agent: httpsAgent,
});
exports.default = cloudinary_1.v2;
