import { Router } from "express";
import { businessModel, businessPostModel } from "../db";
import { userMiddleware } from "../middleware/usermiddleware";
import upload from "../middleware/multer";
const businessRouter = Router();




businessRouter.post(
  "/profile",
  userMiddleware,
  upload.single("profilePhoto"),
  //@ts-ignore
  async (req, res) => {
    const {
      industry,
      websiteUrl,
      targetAudience,
      businessName,
    } = req.body;

    //@ts-ignore
    const userId = req.userId;

    const profilePhoto = req.file?.path || "";

    try {
      const existingProfile = await businessModel.findOne({ userId });

      if (existingProfile) {
        // UPDATE existing profile
        await businessModel.findOneAndUpdate(
          { userId },
          {
            industry,
            websiteUrl,
            businessName,
            targetAudience,
            profilePhoto: profilePhoto || existingProfile.profilePhoto, // keep old if not uploaded
            posted: new Date().toLocaleDateString("en-GB"),
          },
          { new: true }
        );

        return res.json({
          message: "Profile updated successfully",
        });
      }

      // CREATE new profile
      await businessModel.create({
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
    } catch (error) {
      console.log("Error in handling profile", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);


businessRouter.get("/profile", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;

  const foundUser = await businessModel.findOne({
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

businessRouter.get("/all-business", async (req, res) => {
  try {
    const businessProfiles = await businessModel.find(); // Await the DB query
    res.json({ businessProfiles });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

businessRouter.get("/user-data", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const user = await businessModel.findOne({
    userId: userId,
  });
  if (!user) {
    res.json({
      message: "user not found",
    });
  } else {
    // console.log("Fetched user:", user);
    res.json({
      user,
    });
  }
});

//@ts-ignore
businessRouter.post("/create-post", userMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const {
    title,
    description,
    targetAudience,
    budget,
    platform,
    postedOn
  } = req.body;

  try {
    const businessProfile = await businessModel.findOne({ userId });

    if (!businessProfile) {
      return res.status(404).json({ message: "Business profile not found" }); // if found the business profile then use that _id.
    }

    await businessPostModel.create({
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
  } catch (e) {
    res.status(500).json({
      message: "Error in posting"
    });
  }
});

businessRouter.get("/get-posts", async (req, res) => {
  try {
    const posts = await businessPostModel
      .find()
      .populate("userId"); // populates businessProfile

    res.status(200).json({
      posts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error in fetching posts"
    });
  }
});



export { businessRouter };
