import Cash from "../models/Cash.js";
import "../models/database.js";

// create a new payment
export const create = async (req, res) => {
  try {
    // validate request
    const { amount } = req.body;

    // create a new cash
    const Cash = new Cash({
      amount,
    });

    // save cash in the database

    const savedCash = await Cash.save();

    return res.status(201).json({
      success: true,
      message: "Cash created successfully",
      data: savedCash,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while creating the cash payment.",
    });
  }
};

// fetch all cash payments
export const fetchAllCash = async (req, res) => {
  // console.log("fetching all cash payments");
  try {
    const Cash = await Cash.find().exec();

    return res.status(200).json({
      success: true,
      data: Cash,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};
