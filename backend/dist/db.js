"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessPostModel = exports.messageModel = exports.otpModel = exports.businessModel = exports.creatorModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
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
    postedOn: Date
});
// ===== MODELS =====
const userModel = mongoose_1.default.model("users", userSchema);
exports.userModel = userModel;
const creatorModel = mongoose_1.default.model("creatorProfile", creatorProfileSchema);
exports.creatorModel = creatorModel;
const businessModel = mongoose_1.default.model("businessProfile", businessProfileSchema);
exports.businessModel = businessModel;
const otpModel = mongoose_1.default.model("otp", otpSchema);
exports.otpModel = otpModel;
const messageModel = mongoose_1.default.model("message", messageSchema);
exports.messageModel = messageModel;
const businessPostModel = mongoose_1.default.model("post", businessPostSchema);
exports.businessPostModel = businessPostModel;
