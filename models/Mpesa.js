import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MpesaSchema = new Schema({
  fullName: String,
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
    },
  
  lastName: {
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
    type: String,
  },

  BusinessShortCode: {
    type: String,
  },

  BillRefNumber: {
    type: String,
  },

  InvoiceNumber: {
    type: String,
  },

  OrgAccountBalance: {
    type: String,
  },

  ThirdPartyTransID: {
    type: String,
  },

  TransAmount: {
    type: String,
  },

  MSISDN: {
    type: String,
  },
}, 
  {
    timestamps: true,
}
);

let Model = mongoose.model("Mpesa", MpesaSchema);

export default Model;
