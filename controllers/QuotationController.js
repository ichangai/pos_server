import "../models/database.js";
import Product from "../models/Product.js";
import Quotation from "../models/Quotation.js";
import { generateRefNo } from "../services/ref_service.js";
// create a new quotation
export const create = async (req, res) => {
  try {
    // validate request
    const { customer, products, amount, payment_mode, status } = req.body;

    // generate random ref number
    const ref = generateRefNo();

    // create a new sale
    const sale = new Quotation({
      customer,
      ref_no: ref,
      products,
      amount,
      payment_mode,
      status,
    });

    // loop through the product array and update the product quantity
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findByIdAndUpdate(
        products[i].product,
        { $inc: { quantity: -products[i].quantity } },
        { new: true }
      );
      console.log(product);
    }
    // save sale in the database
    const savedSale = await sale.save();

    return res.status(201).json({
      success: true,
      message: "Sale created successfully",
      data: savedSale,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// get all quotations

export const fetchAll = async (req, res) => {
  // console.log("fetching all quotations");
  try {
    const quotations = await Quotation.find()
      .populate("customer")
      .populate("product")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Quotations retrieved successfully",
      data: quotations,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get a single quotation
export const fetchSingle = async (req, res) => {
  try {
    const id = req.params.id;

    const quotation = await Quotation.findById(id)
      .populate("customer")
      .populate("product")
      .exec();

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quotation retrieved successfully",
      data: quotation,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update a quotation
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { customer, product, quantity, unit_price, total_price } = req.body;

    const quotation = await Quotation.findByIdAndUpdate(
      id,
      {
        customer,
        product,
        quantity,
        unit_price,
        total_price,
      },
      { new: true }
    );

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quotation updated successfully",
      data: quotation,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete a quotation
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const quotation = await Quotation.findByIdAndRemove(id);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quotation deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
