import "../models/database.js";
import Supplier from "../models/Supplier.js";

// create a new supplier
export const create = async (req, res) => {
  try {
    // validate request
    const { full_name, email, phone, location } = req.body;

    // create a new supplier
    const supplier = new Supplier({
      full_name,
      email,
      phone,
      location,
    });

    // save supplier in the database
    const savedSupplier = await supplier.save();

    return res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: savedSupplier,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// retrieve and return all suppliers from the database
export const fetchAll = async (req, res) => {
  try {
    const suppliers = await Supplier.find().exec();

    return res.status(200).json({
      success: true,
      message: "Suppliers retrieved successfully",
      data: suppliers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// retrieve and return all suppliers from the database
export const fetchSingle = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).exec();

    return res.status(200).json({
      success: true,
      message: "Supplier retrieved successfully",
      data: supplier,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update a supplier identified by the supplierId in the request
export const update = async (req, res) => {
  try {
    // validate request
    const { name, email, phone, location } = req.body;

    // find supplier and update it with the request body
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        location,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Supplier updated successfully",
      data: supplier,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// delete a supplier with the specified supplierId in the request
export const remove = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndRemove(req.params.id).exec();

    return res.status(200).json({
      success: true,
      message: "Supplier deleted successfully",
      data: supplier,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



