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
exports.businessRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const usermiddleware_1 = require("../middleware/usermiddleware");
const multer_1 = __importDefault(require("../middleware/multer"));
const businessRouter = (0, express_1.Router)();
exports.businessRouter = businessRouter;
businessRouter.post("/profile", usermiddleware_1.userMiddleware, multer_1.default.single("profilePhoto"), 
//@ts-ignore
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { industry, websiteUrl, targetAudience, businessName, } = req.body;
    //@ts-ignore
    const userId = req.userId;
    const profilePhoto = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
    try {
        const existingProfile = yield db_1.businessModel.findOne({ userId });
        if (existingProfile) {
            // UPDATE existing profile
            yield db_1.businessModel.findOneAndUpdate({ userId }, {
                industry,
                websiteUrl,
                businessName,
                targetAudience,
                profilePhoto: profilePhoto || existingProfile.profilePhoto, // keep old if not uploaded
                posted: new Date().toLocaleDateString("en-GB"),
            }, { new: true });
            return res.json({
                message: "Profile updated successfully",
            });
        }
        // CREATE new profile
        yield db_1.businessModel.create({
            businessName,
            userId,
            industry,
            websiteUrl,
            targetAudience,
            profilePhoto,
            posted: new Date().toLocaleDateString("en-GB"),
        });
        res.json({
            message: "Profile created successfully",
        });
    }
    catch (error) {
        console.log("Error in handling profile", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}));
businessRouter.get("/profile", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const foundUser = yield db_1.businessModel.findOne({
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
businessRouter.get("/all-business", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const businessProfiles = yield db_1.businessModel.find(); // Await the DB query
        res.json({ businessProfiles });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
businessRouter.get("/user-data", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const user = yield db_1.businessModel.findOne({
        userId: userId,
    });
    if (!user) {
        res.json({
            message: "user not found",
        });
    }
    else {
        // console.log("Fetched user:", user);
        res.json({
            user,
        });
    }
}));
//@ts-ignore
businessRouter.post("/create-post", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const { title, description, targetAudience, budget, platform, postedOn } = req.body;
    try {
        const businessProfile = yield db_1.businessModel.findOne({ userId });
        if (!businessProfile) {
            return res.status(404).json({ message: "Business profile not found" }); // if found the business profile then use that _id.
        }
        yield db_1.businessPostModel.create({
            userId: businessProfile._id,
            title,
            description,
            targetAudience,
            budget,
            platform,
            postedOn
        });
        res.status(200).json({
            message: "Post created successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error in posting"
        });
    }
}));
businessRouter.get("/get-posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db_1.businessPostModel
            .find()
            .populate("userId"); // populates businessProfile
        res.status(200).json({
            posts,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Error in fetching posts"
        });
    }
}));
