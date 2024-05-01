import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UnaccountedSchema = new Schema({
  FirstName: {
    type: String,
  },
  TransactionType: {
    type: String,
    default: "Paybill",
  },

  TransID: {
    type: String,
  },
  TransTime: {
    type: String,
  },

  TransAmount: {
    type: Number,
  },

  Amount: {
    type: Number,
  },

  BusinessShortCode: {
    type: String,
  },

  BillRefNumber: {
    type: Number,
  },

  // AccountNo: {
  //   type: Number,
  // },

  InvoiceNumber: {
    type: String,
    null: true,
  },

  OrgAccountBalance: {
    type: Number,
  },

  ThirdPartyTransID: {
    type: String,
    null: true,
  },

  paymentDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

let Model = mongoose.model("Unaccounted", UnaccountedSchema);

export default Model;
