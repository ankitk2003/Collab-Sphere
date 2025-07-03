import mongoose from "mongoose";
const { Schema, Types } = mongoose;

// ===== USER SCHEMA =====
const userSchema = new Schema({
  email: { type: String, required: true },
  password: String,
  username: String,
  role: String,
});

// ===== CREATOR PROFILE SCHEMA =====
const creatorProfileSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "users", required: true },
  username: String,
  bio: String,
  niche: String,
  platformName: String,
  platformLink: String,
  followerCount: Number,
  engagementRate: Number,
   profilePhoto: {
    type: String,
    default: "",
  }
});

// ===== BUSINESS PROFILE SCHEMA =====
const businessProfileSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "users", required: true },
  businessName: String,
  industry: String,
  websiteUrl: String,
  targetAudience: [String],
   profilePhoto: {
    type: String,
    default: "",
  },
  posted: String,
});

// ===== OTP SCHEMA =====
const otpSchema = new Schema({
  email: { type: String, unique: true },
  otp: String,
  otpExpires: Date,
  hashedPassword: String,
  username: String,
  role: String,
  verified: { type: Boolean, default: false },
});

// ===== MESSAGE SCHEMA =====
const messageSchema = new Schema({
  roomId: { type: String, required: true },
  senderId: { type: Types.ObjectId, ref: "users", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// ===== BUSINESS POST SCHEMA =====
const businessPostSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "businessProfile", required: true },
  title: String,
  description: String,
  targetAudience: [String],
  budget: Number,
  platform: String,
  postedOn:Date
});

// ===== MODELS =====
const userModel = mongoose.model("users", userSchema);
const creatorModel = mongoose.model("creatorProfile", creatorProfileSchema);
const businessModel = mongoose.model("businessProfile", businessProfileSchema);
const otpModel = mongoose.model("otp", otpSchema);
const messageModel = mongoose.model("message", messageSchema);
const businessPostModel = mongoose.model("post", businessPostSchema);

// ===== EXPORTS =====
export {
  userModel,
  creatorModel,
  businessModel,
  otpModel,
  messageModel,
  businessPostModel,
};
