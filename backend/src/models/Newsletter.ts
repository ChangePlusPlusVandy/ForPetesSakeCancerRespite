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
  timePosted : String,
  postsLiked : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
  comments : [{
      content: String,
      timePosted: String,
      author: {type:mongoose.Schema.Types.ObjectId, ref:"User"}
  }]
});

export default mongoose.model("Newsletter", NewsletterSchema);
