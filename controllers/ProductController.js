import "../models/database.js";
import Product from "../models/Product.js";

// create a new product
export const create = async (req, res) => {
  try {
    // validate request
    const { name, price, quantity, category, unit } = req.body;

    // create a new product
    const product = new Product({
      name,
      price,
      quantity,
      category,
      unit,
    });

    // save product in the database
    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// retrieve and return all products from the database
export const fetchAll = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("unit")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// retrieve and return all products from the database
export const fetchSingle = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("unit")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// update a product by the id in the request
export const update = async (req, res) => {
  try {
    const { name, price, quantity, category, unit } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      quantity,
      category,
      unit
    }, { new: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// delete a product with the specified id in the request
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

