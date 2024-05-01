import express from "express";
import {
  create,
  fetchAll,
  fetchSingle,
  remove,
  update,
} from "../controllers/CustomerController.js";

const router = express.Router();
router
  .post("/", create)
  .get("/", fetchAll)
  .get("/:id", fetchSingle)
  .patch("/:id", update)
  .delete("/:id", remove);

export default router;
