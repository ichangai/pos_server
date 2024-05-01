import "../models/database.js"; 
import Category from "../models/Category.js";

// create a new category
export const create = async (req, res) => {
  try {
    // validate request
    const { name } = req.body;

    // create a new category
    const category = new Category({
      name,
    });

    // save category in the database
    const savedCategory = await category.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// retrieve and return all categories from the database
export const fetchAll = async (req, res) => {
  try {
    const categories = await Category.find().exec();

    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



// retrieve and return all categories from the database
export const fetchSingle = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).exec();

    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// update a category identified by the categoryId in the request
export const update = async (req, res) => {
  try {
    // validate request
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category to update",
      });
    }

    // find category and update it with the request body
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// delete a category with the specified categoryId in the request
export const remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

