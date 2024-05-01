import express from "express";
import {
  create,
  fetchAllSales,
  fetchSingle,
  remove,
  update,
} from "../controllers/SaleController.js";

const router = express.Router();
router
  .post("/", create)
  .get("/", fetchAllSales)
  .get("/:id", fetchSingle)
  .patch("/:id", update)
  .delete("/:id", remove);

export default router;
