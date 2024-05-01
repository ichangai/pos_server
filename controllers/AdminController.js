import bcrypt from "bcrypt";
import session from "express-session";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import "../models/database.js";

// create an admin
export const adminRegister = async (req, res) => {
  try {
    // check if admin exists in db
    const adminExists = await Admin.findOne({
      email: req.body.email,
    });

    if (adminExists) {
      return res.status(409).json({
        success: false,
        message: "A admin already exists with this email",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const { name, email, phone } = req.body;

      const newAdmin = new Admin({
        name,
        email,
        phone,
        password: hashedPassword,
      });

      const registeredAdmin = await newAdmin.save();
      const admin = registeredAdmin.toJSON();

      let token = jwt.sign(admin, `${process.env.SECRET_KEY}`, {
        expiresIn: 10800, //3 hours
      });

      res.status(201).json({
        success: true,
        message: "Admin created successfully",
        token: token,
        data: admin,
      });
    }
  } catch (error) {
    console.log(error);
    //   return status 500 and the error object
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    const headers = req.headers;

    // Check the User-Agent header
    const userAgent = headers["user-agent"];

    // Check if admin exists in the database
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email" });
    }

    // Check if password is correct
    const validPassword = bcrypt.compareSync(req.body.password, admin.password);
    if (!validPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Wrong password" });
    }

    // Check if the user agent is Android
    if (userAgent.includes("Android")) {
      // Start a session and store the admin data
      req.session.admin = admin.toJSON();
      req.session.save((err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, message: "Error saving session" });
        }
        return res.status(200).json({
          success: true,
          message: "Successfully logged in",
          source: "Android",
          data: admin,
        });
      });
    } else {
      // Generate a JWT token and return it to the client
      let token = jwt.sign(admin.toJSON(), `${process.env.SECRET_KEY}`, {
        expiresIn: 10800, // 3 hours
      });
      return res.status(200).json({
        success: true,
        token: token,
        data: admin,
        source: "Machine",
        message: "Successfully logged in",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Please clear cookies and try again",
      error: err,
    });
  }
};

// verify
export const getAdmin = async (req, res) => {
  try {
    let foundAdmin = await Admin.findOne({ _id: req.decoded._id });
    if (foundAdmin) {
      res.status(200).json({
        success: true,
        data: foundAdmin,
        message: "Admin found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      textMsg: "Sorry, no token found",
    });
  }
};

export const getSingleAdmin = async (req, res) => {
  try {
    let foundAdmin = await Admin.findOne({ _id: req.decoded._id });
    if (foundAdmin) {
      res.status(200).json({
        success: true,
        admin: foundAdmin,
        message: "Admin found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      textMsg: "Sorry, no token found",
    });
  }
};

// fetch all admins
export const getAllAdmins = async (req, res) => {
  try {
    let admins = await Admin.find({});
    res.status(200).json({
      success: true,
      admins: admins,
      message: "All admins fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

// delete admin
export const deleteAdmin = async (req, res) => {
  try {
    let deletedAdmin = await Admin.findOneAndDelete({ _id: req.params.id });
    if (deletedAdmin) {
      res.status(200).json({
        success: true,
        admin: deletedAdmin,
        message: "Admin deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

// update admin
export const updateAdmin = async (req, res) => {
  try {
    let foundAdmin = await Admin.findOne({ _id: req.params.id });

    if (foundAdmin) {
      if (req.file) foundAdmin.image = req.file.path;
      if (req.body.name) foundAdmin.name = req.body.name;
      if (req.body.email) foundAdmin.email = req.body.email;
      if (req.body.phone) foundAdmin.phone = req.body.phone;
      if (req.body.password) foundAdmin.password = req.body.password;

      await foundAdmin.save();

      res.status(201).json({
        status: true,
        message: "Successfully updated admin",
        data: foundAdmin,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "admin not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
