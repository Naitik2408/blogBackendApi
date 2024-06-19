import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{ timestamps: true })


export const Post = mongoose.model("Post", postSchema)