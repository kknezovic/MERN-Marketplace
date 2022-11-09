import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    content: {
      type: String,
      required: "Content is required",
      maxlength: 10000,
    },
    category: {
      type: String,
    },
    condition: {
      type: String,
    },
    price: {
      type: Number,
      required: "Price is required",
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
