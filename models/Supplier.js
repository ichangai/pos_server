import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SupplierSchema = new Schema(
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
      null: true,
    },

    location: {
      type: String,
      null: null,
    },
  },
  {
    timestamps: true,
  }
);

let Model = mongoose.model("Supplier", SupplierSchema);

export default Model;
