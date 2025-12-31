import mongoose from "mongoose";

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    sourceUrl: {
      type: String,
      unique: true,
      required: true,
    },

    isUpdated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);

