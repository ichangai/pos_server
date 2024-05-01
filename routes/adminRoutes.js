
import express from "express";
import {
  adminRegister,
  adminLogin,
  getAdmin,
  getSingleAdmin,
} from "../controllers/AdminController.js";
import passport from "passport";

const router = express.Router();

router.post("/", adminRegister)
  .post("/login", adminLogin)
  ;
// .get("/:id", fetchSingle);
// .patch("/:id", update)
// .delete("/:id", delete);

export default router;

