import express from "express";
import * as dotenv from "dotenv";
import cloudinary from "cloudinary";
import net from "net";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

// POST
if (net.setDefaultAutoSelectFamily) {
  net.setDefaultAutoSelectFamily(false)
} 
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    //Upload image to cloudinary//
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
})

export default router;
