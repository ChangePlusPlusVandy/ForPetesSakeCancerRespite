import mongoose from "mongoose"

export const collections: { posts?: mongoose.Collection } = {}

const NewsletterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String, 
        required: true
    }, 
    author: String, 

})

export default mongoose.model("Newsletter", NewsletterSchema);