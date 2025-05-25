import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  author: {type: String, default: ''},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", PostSchema);