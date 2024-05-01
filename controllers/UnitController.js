import "../models/database.js";
import Unit from "../models/Unit.js";

// create a new unit
export const create = async (req, res) => {
  try {
    // validate request
    const { name } = req.body;

    // create a new unit
    const unit = new Unit({
      name,
    });

    // save unit in the database
    const savedUnit = await unit.save();

    return res.status(201).json({
      success: true,
      message: "Unit created successfully",
      data: savedUnit,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// retrieve and return all units from the database
export const fetchAll = async (req, res) => {
  try {
    const units = await Unit.find().exec();

    return res.status(200).json({
      success: true,
      message: "Units retrieved successfully",
      data: units,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// retrieve and return all units from the database
export const fetchSingle = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id).exec();

    return res.status(200).json({
      success: true,
      message: "Unit retrieved successfully",
      data: unit,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update a unit by the id in the request
export const update = async (req, res) => {
  try {
    // validate request
    const { name } = req.body;

    // find unit and update it with the request body
    const updatedUnit = await Unit.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Unit updated successfully",
      data: updatedUnit,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// delete a unit with the specified id in the request
export const remove = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndRemove(req.params.id).exec();

    return res.status(200).json({
      success: true,
      message: "Unit deleted successfully",
      data: unit,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete all units from the database.
export const removeAll = async (req, res) => {
  try {
    const units = await Unit.deleteMany({}).exec();

    return res.status(200).json({
      success: true,
      message: "Units deleted successfully",
      data: units,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

