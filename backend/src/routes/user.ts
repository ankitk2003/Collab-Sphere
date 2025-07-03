import { Router } from "express";
import { userModel, otpModel } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
const userRouter = Router();
const JWT_user_password = "ankit123";

import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
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
userRouter.post("/signup", async (req, res) => {
  const { email, password, username, role } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const otp = generateOtp();
    const hashedPassword = await bcrypt.hash(password, 10);

    const tempUser = await otpModel.findOneAndUpdate(
      { email },
      {
        email,
        hashedPassword,
        username,
        role,
        otp,
        otpExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
      { upsert: true, new: true }
    );
 
    // console.log(tempUser);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
    return res
      .status(200)
      .json({ message: "OTP sent to email", tempUser, otp });
  } catch (e) {
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
});

//@ts-ignore
userRouter.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const foundInRecord = await otpModel.findOne({ email });

    if (!foundInRecord) {
      return res.status(400).json({ message: "Otp not found" });
    }
    //@ts-ignore
    if (foundInRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid Otp" });
    }

    //@ts-ignore
    const newUser = await userModel.create({
      email: foundInRecord.email,
      password: foundInRecord.hashedPassword,
      username: foundInRecord.username,
      role: foundInRecord.role,
    });

    await otpModel.deleteOne({ email });

    const token = jwt.sign({ id: newUser._id }, JWT_user_password);

    res.json({
      message: "Signed-up and logged-in successfully",
      token: token,
      userName: newUser.username,
      role: newUser.role,
    });
  } catch (e) {
    console.log("Error in verifying OTP:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@ts-ignore
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }
    //@ts-ignore
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_user_password
    );

    res.json({
      token: token,
      userName: user.username,
      role: user.role,
    });
  } catch (e) {
    console.log("Error during signin: " + e);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { userRouter };
