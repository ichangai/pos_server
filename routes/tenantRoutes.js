import express from "express";

const router = express.Router();
import {
  create,
  findAll,
  findSingle,
  update,
} from "../controllers/TenantController.js";

router
  .post("/", create)
  .get("/", findAll)
  .get("/:tenantId", findSingle)
  .patch("/:tenantId", update);

export default router;
