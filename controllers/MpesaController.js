import dotenv from "dotenv";
import Mpesa from "../models/Mpesa.js";
import Unaccounted from "../models/Unaccounted.js";
dotenv.config();

const convertStringToInt = (inputString) => {
  const newData = parseInt(inputString);

  if (isNaN(newData)) {
    console.log(`Unable to convert '${inputString}' to a number.`);
    return null;
  }
  console.log(`Converted '${inputString}' to a number: ${newData}`);
  return newData;
};

// create a new mpesa payment
export const create = async (req, res) => {
  const {
    FirstName,
    TransactionType,
    TransID,
    TransTime,
    TransAmount,
    BusinessShortCode,
    BillRefNumber,
    InvoiceNumber,
    OrgAccountBalance,
    ThirdPartyTransID,
  } = req.body;
  console.log("Mpesa C2B");
  console.log(req.body);

  try {
    const mpesa = new Mpesa();
    mpesa.fullName = FirstName;
    mpesa.TransactionType = TransactionType;
    mpesa.paidBy = FirstName;
    mpesa.TransID = TransID;
    mpesa.TransTime = TransTime;
    mpesa.TransAmount = convertTransAmount;
    mpesa.Amount = convertTransAmount;
    mpesa.BusinessShortCode = BusinessShortCode;
    mpesa.BillRefNumber = BillRefNumber;
    mpesa.InvoiceNumber = InvoiceNumber;
    mpesa.OrgAccountBalance = OrgAccountBalance;
    mpesa.ThirdPartyTransID = ThirdPartyTransID;
    mpesa.paymentDate = new Date();

    const savedMpesa = await mpesa.save();

    if (savedMpesa) {
      res.status(200).json({
        success: true,
        message: "Successfully saved Mpesa transaction",
        mpesa: savedMpesa,
      });
      console.log("Mpesa transaction saved");
    } else {
      res.status(500).json({
        success: false,
        message: "Error saving Mpesa transaction",
      });
      console.log("Mpesa transaction not saved");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const fetchData = async (req, res) => {
  try {
    const allData = await Mpesa.find();

    if (!allData) {
      return res.status(404).json({
        status: "fail",
        message: "No data found",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: allData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "No data found",
    });
  }
};

export const fetchUnaccounted = async (req, res) => {
  const allData = await Unaccounted.find({ TransID: { $ne: null } });
  try {
    if (allData) {
      res.status(200).json({
        status: "Success",
        message: "Fetched unaccounted mpesa successfully",
        data: allData,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
    console.log(err);
  }
};

// export const fetchReportData = async (req, res) => {
//   try {
//     const totalMpesa = await Mpesa.aggregate([
//       { $group: { _id: null, total: { $sum: "$TransAmount" } } },
//     ]);

//     const currentYearMpesa = await Mpesa.aggregate([
//       {
//         $match: {
//           paymentDate: {
//             $gte: new Date(new Date().getFullYear(), 0, 1),
//             $lt: new Date(new Date().getFullYear() + 1, 0, 1),
//           },
//         },
//       },
//       { $group: { _id: null, total: { $sum: "$TransAmount" } } },
//     ]);

//     const currentMonthMpesa = await Mpesa.aggregate([
//       {
//         $match: {
//           paymentDate: {
//             $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//             $lt: new Date(
//               new Date().getFullYear(),
//               new Date().getMonth() + 1,
//               1
//             ),
//           },
//         },
//       },
//       { $group: { _id: null, total: { $sum: "$TransAmount" } } },
//     ]);

//     if (totalMpesa.length === 0) totalMpesa[0] = { total: 0 };
//     if (currentYearMpesa.length === 0) currentYearMpesa[0] = { total: 0 };
//     if (currentMonthMpesa.length === 0) currentMonthMpesa[0] = { total: 0 };

//     res.status(200).json({
//       success: true,
//       status: "success",
//       message: "Mpesa report data fetched successfully",
//       totalMpesa: totalMpesa[0].total,
//       currentYearMpesa: currentYearMpesa[0].total,
//       currentMonthMpesa: currentMonthMpesa[0].total,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
