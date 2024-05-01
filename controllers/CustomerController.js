import "../models/database.js";
import Customer from "../models/Customer.js";

// create a new customer
export const create = async (req, res) => {
  try {
    // validate request
    const { full_name, email, phone, location } = req.body;

    // create a new customer
    const customer = new Customer({
      full_name,
      email,
      phone,
      location,
    });

    // save customer in the database
    const savedCustomer = await customer.save();

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: savedCustomer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// retrieve and return all customers from the database
export const fetchAll = async (req, res) => {
  try {
    const customers = await Customer.find().exec();

    return res.status(200).json({
      success: true,
      message: "Customers retrieved successfully",
      data: customers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// retrieve and return all customers from the database
export const fetchSingle = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).exec();

    return res.status(200).json({
      success: true,
      message: "Customer retrieved successfully",
      data: customer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// update a customer identified by the customerId in the request
export const update = async (req, res) => {
  try {
    // validate request
    const { full_name, email, phone, location } = req.body;

    // find customer and update it with the request body
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        full_name,
        email,
        phone,
        location,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



// delete a customer with the specified customerId in the request
export const remove = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id).exec();

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      data: customer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

