import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required :true
        
    },
    mediaType :{
        type : String,
        enum : ["image", "video"],
        required : true
    },
    media : {
        type : String,
        required : true
    },
    caption : {
        type : String,
        
    },
    like : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
            
        }
        ,

    ],
    comments :[
        {
           type : mongoose.Schema.Types.ObjectId,
            ref : "user" 
        }
    ]
}, {timestamps : true})
const post = mongoose.model("post", postSchema);
export default post;