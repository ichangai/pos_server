import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ExpenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
})

let Model = mongoose.model("Expense", ExpenseSchema);

export default Model;
