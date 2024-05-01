import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CashPaymentSchema = new Schema({

  amount: {
    type: Number,
    required: true,
  },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
}, 
  {
    timestamps: true,
}
);

let Model = mongoose.model("CashPayment", CashPaymentSchema);

export default Model;
