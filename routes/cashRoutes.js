import express from "express";
import { create, fetchAllCash } from "../controllers/CashController.js";

const router = express.Router();

router.post("/", create).get("/", fetchAllCash);
  // .get("/:id", fetchSingle);
// .patch("/:id", update)
// .delete("/:id", delete);

export default router;
