import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "profile_photos",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("File field name:", file.fieldname); 
    if (file.fieldname === "profilePhoto") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
    }
  },
});

export default upload;
