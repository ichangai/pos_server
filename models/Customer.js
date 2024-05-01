import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      null: true,
    },

    phone: {
      type: String,
      required: true,
      unique: [true, "Phone number already exists"],
    },

    location: {
      type: String,
      required: null,
    },
  },
  {
    timestamps: true,
  }
);

let Model = mongoose.model("Customer", CustomerSchema);

export default Model;
