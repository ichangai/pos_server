import express from "express";

const router = express.Router();
import {
  create,
  fetchData,
  fetchUnaccounted,
} from "../controllers/MpesaController.js";

router
  .post("/", create)
  .get("/", fetchData)
  .get("/unaccounted", fetchUnaccounted);

export default router;
