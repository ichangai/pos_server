import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuotationSchema = new Schema(
  {
    // array of objects of products and their quantities
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    ref_no: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    payment_mode: {
      type: String,
      enum: ["cash", "mpesa"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Model = mongoose.model("Quotation", QuotationSchema);

export default Model;
