import "../models/database.js";
import Sale from "../models/Sales.js";
import Product from "../models/Product.js";
import { generateRefNo } from "../services/ref_service.js";
import Cash from "../models/Cash.js";
// create a new sale
export const create = async (req, res) => {
  try {
    // validate request
    const {
      customer,
      products,
      amount,
      payment_mode,
      status,
    } = req.body;

    // generate random ref number
    const ref = generateRefNo();

    // create a new sale
    const sale = new Sale({
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
// retrieve and return all sales from the database
export const fetchAllSales = async (req, res) => {
  const sales = await Sale.find()
    .populate("customer")
    .populate("products.product")
    .exec();
  try {

    return res.status(200).json({
      success: true,
      message: "Sales retrieved successfully",
      data: sales,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// retrieve and return all sales from the database
export const fetchSingle = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("customer")
      .populate("product")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Sale retrieved successfully",
      data: sale,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const findAllSales = async => { console.log("fetching all sales");}

// update a sale identified by the saleId in the request
export const update = async (req, res) => {
  try {
    // validate request
    const { customer, product, amount, date } = req.body;

    // create a new sale
    const sale = {
      customer,
      product,
      amount,
      date,
    };

    // update sale in the database
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, sale, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Sale updated successfully",
      data: updatedSale,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// delete a sale with the specified saleId in the request
export const remove = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


