import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    prompt: { type: "string", required: true },
    photo: { type: "string", required: true },
  }
);

const PostSchema = mongoose.model("Post", Post)

export default PostSchema