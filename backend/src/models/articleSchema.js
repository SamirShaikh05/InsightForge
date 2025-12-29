import mongoose from 'mongoose';

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: String,
    sourceUrl: {
      type: String,
      unique: true 
    },
    isUpdated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
