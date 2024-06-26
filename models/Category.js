import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

let Model = mongoose.model("Category", CategorySchema);

export default Model;
