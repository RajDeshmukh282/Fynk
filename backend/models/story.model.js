import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],

      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    viewers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    CreatedAt: {
      type: Date,
      default: Date.now,
      expires: 86400,
    },
  },
  {
    timestamps: true,
  }
);

const story = mongoose.model("story", storySchema);
export default story;
