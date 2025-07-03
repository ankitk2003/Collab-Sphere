import { Router } from "express";
import { creatorModel, userModel } from "../db";
import { userMiddleware } from "../middleware/usermiddleware";
import upload from "../middleware/multer";

const creatorRouter = Router();

creatorRouter.post(
  "/profile",
  userMiddleware,
  (req, res, next) => {
    upload.single("profilePhoto")(req, res, function (err) {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  //@ts-ignore
  async (req, res) => {
    try {
      const {
        niche,
        username,
        bio,
        platformLink,
        platformName,
        followerCount,
        engagementRate,
      } = req.body;

      //@ts-ignore
      const userId = req.userId;
      const profilePhoto = req.file?.path || "";

      const existingProfile = await creatorModel.findOne({ userId });

      if (existingProfile) {
        // Update existing profile
        await creatorModel.findOneAndUpdate(
          { userId },
          {
            niche,
            username,
            bio,
            platformName,
            platformLink,
            followerCount,
            engagementRate,
            profilePhoto: profilePhoto || existingProfile.profilePhoto, // keep old if not re-uploaded
          },
          { new: true }
        );

        return res.json({
          message: "Profile updated successfully",
        });
      }

      // Create new profile
      await creatorModel.create({
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
    } catch (err: any) {
      console.error("Upload error:", JSON.stringify(err, null, 2));
      res.status(500).json({ error: err.message || "Something went wrong" });
    }
  }
);


creatorRouter.get("/profile", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;

  const foundUser = await creatorModel.findOne({
    userId,
  });
  if (!foundUser) {
    res.json({
      message: "complete your profile first",
    });
  } else {
    res.json({
      foundUser,
    });
  }
});

creatorRouter.get("/all-profiles", async (req, res) => {
  try {
    const allProfiles = await creatorModel.find();
    res.json({
      profiles: allProfiles,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
});

creatorRouter.get("/user-data", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const userData = await userModel.findOne({
    _id: userId,
  });
  if (!userData) {
    res.json({
      message: "user not found",
    });
  } else {
    res.json({
      userData,
    });
  }
}); // this return user model data .

creatorRouter.get("/user-profile", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const userData = await creatorModel.findOne({
    userId: userId,
  }).populate("userId");
  if (!userData) {
    res.json({
      message: "user not found",
    });
  } else {
    res.json({
      userData,
    });
  }
}); 

export { creatorRouter };
