import mongoose from "mongoose";

export const collections: { posts?: mongoose.Collection } = {};

const NewsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: String,
  timePosted: String,
  postsLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      content: String,
      timePosted: Number,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  user: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  images : [{uri:String}]
});

export default mongoose.model("Newsletter", NewsletterSchema);
