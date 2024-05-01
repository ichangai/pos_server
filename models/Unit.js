import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UnitSchema = new Schema(
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

const Unit = mongoose.model("Unit", UnitSchema);

export default Unit;