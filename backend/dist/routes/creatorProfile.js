"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatorRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const usermiddleware_1 = require("../middleware/usermiddleware");
const multer_1 = __importDefault(require("../middleware/multer"));
const creatorRouter = (0, express_1.Router)();
exports.creatorRouter = creatorRouter;
creatorRouter.post("/profile", usermiddleware_1.userMiddleware, (req, res, next) => {
    multer_1.default.single("profilePhoto")(req, res, function (err) {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, 
//@ts-ignore
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { niche, username, bio, platformLink, platformName, followerCount, engagementRate, } = req.body;
        //@ts-ignore
        const userId = req.userId;
        const profilePhoto = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
        const existingProfile = yield db_1.creatorModel.findOne({ userId });
        if (existingProfile) {
            // Update existing profile
            yield db_1.creatorModel.findOneAndUpdate({ userId }, {
                niche,
                username,
                bio,
                platformName,
                platformLink,
                followerCount,
                engagementRate,
                profilePhoto: profilePhoto || existingProfile.profilePhoto, // keep old if not re-uploaded
            }, { new: true });
            return res.json({
                message: "Profile updated successfully",
            });
        }
        // Create new profile
        yield db_1.creatorModel.create({
            userId,
            niche,
            username,
            bio,
            platformName,
            platformLink,
            followerCount,
            engagementRate,
            profilePhoto,
        });
        res.json({
            message: "Profile created successfully",
        });
    }
    catch (err) {
        console.error("Upload error:", JSON.stringify(err, null, 2));
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}));
creatorRouter.get("/profile", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const foundUser = yield db_1.creatorModel.findOne({
        userId,
    });
    if (!foundUser) {
        res.json({
            message: "complete your profile first",
        });
    }
    else {
        res.json({
            foundUser,
        });
    }
}));
creatorRouter.get("/all-profiles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProfiles = yield db_1.creatorModel.find();
        res.json({
            profiles: allProfiles,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profiles", error });
    }
}));
creatorRouter.get("/user-data", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const userData = yield db_1.userModel.findOne({
        _id: userId,
    });
    if (!userData) {
        res.json({
            message: "user not found",
        });
    }
    else {
        res.json({
            userData,
        });
    }
})); // this return user model data .
creatorRouter.get("/user-profile", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const userData = yield db_1.creatorModel.findOne({
        userId: userId,
    }).populate("userId");
    if (!userData) {
        res.json({
            message: "user not found",
        });
    }
    else {
        res.json({
            userData,
        });
    }
}));
