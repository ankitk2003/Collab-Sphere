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
exports.userRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const JWT_user_password = "ankit123";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
//@ts-ignore
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, role } = req.body;
    try {
        const existingUser = yield db_1.userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }
        const otp = generateOtp();
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const tempUser = yield db_1.otpModel.findOneAndUpdate({ email }, {
            email,
            hashedPassword,
            username,
            role,
            otp,
            otpExpires: new Date(Date.now() + 5 * 60 * 1000),
        }, { upsert: true, new: true });
        // console.log(tempUser);
        yield transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your email",
            text: `Your OTP is ${otp}. It expires in 5 minutes.`,
        });
        return res
            .status(200)
            .json({ message: "OTP sent to email", tempUser, otp });
    }
    catch (e) {
        console.error("Error in signup request-otp:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
    // const { email, password, username, role } = req.body;
    // try {
    //   const existingUser = await userModel.findOne({ email });
    //   if (existingUser) {
    //     return res.status(400).json({ message: "User already exists" });
    //   }
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   const newUser = await userModel.create({
    //     email,
    //     password: hashedPassword,
    //     username,
    //     role
    //   });
    //   const token = jwt.sign({ id: newUser._id }, JWT_user_password);
    //   res.json({
    //     message: "Signed-up and logged-in successfully",
    //     token: token,
    //     userName: newUser.username,
    //     role: newUser.role,
    //   });
    // } catch (e) {
    //   console.log("Error in signup: " + e);
    //   res.status(500).json({ message: "Internal server error" });
    // }
}));
//@ts-ignore
userRouter.post("/verify-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const foundInRecord = yield db_1.otpModel.findOne({ email });
        if (!foundInRecord) {
            return res.status(400).json({ message: "Otp not found" });
        }
        //@ts-ignore
        if (foundInRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid Otp" });
        }
        //@ts-ignore
        const newUser = yield db_1.userModel.create({
            email: foundInRecord.email,
            password: foundInRecord.hashedPassword,
            username: foundInRecord.username,
            role: foundInRecord.role,
        });
        yield db_1.otpModel.deleteOne({ email });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, JWT_user_password);
        res.json({
            message: "Signed-up and logged-in successfully",
            token: token,
            userName: newUser.username,
            role: newUser.role,
        });
    }
    catch (e) {
        console.log("Error in verifying OTP:", e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
//@ts-ignore
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield db_1.userModel.findOne({ email: email });
        if (!user) {
            return res.status(403).json({
                message: "Incorrect credentials",
            });
        }
        //@ts-ignore
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Incorrect credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
        }, JWT_user_password);
        res.json({
            token: token,
            userName: user.username,
            role: user.role,
        });
    }
    catch (e) {
        console.log("Error during signin: " + e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
