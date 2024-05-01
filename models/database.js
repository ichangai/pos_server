
// database connection
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_URI;



mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));

  