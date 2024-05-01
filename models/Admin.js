import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
});

let Model = mongoose.model("Admin", AdminSchema);

export default Model;
