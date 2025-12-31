// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const articleSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true
//     },
//     content: String,
//     sourceUrl: {
//       type: String,
//       unique: true
//     },
//     isUpdated: {
//       type: Boolean,
//       default: false
//     },

//     updatedContent: {
//       type: String
//     },
//     enhancedContent: {
//   type: String,
// },

//     references: [
//       {
//         type: String
//       }
//     ]
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Article", articleSchema);


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

