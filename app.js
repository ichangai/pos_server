import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "./models/database.js";
dotenv.config();
import morgan from "morgan";
// const bodyParser = require("body-parser");
import bodyParser from "body-parser";

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(bodyParser.json());


app.get("/api", (req, res) => {
  res.send("Booya, server is up and running!");
});

// routes
import adminRoutes from "./routes/adminRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import mpesaRoutes from "./routes/mpesaRoutes.js";
import cashPaymentRoutes from "./routes/cashRoutes.js";

app.use("/api/admin", adminRoutes);
app.use("/api/unit", unitRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/quotation", quoteRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/mpesa", mpesaRoutes);
app.use("/api/cash_payment", cashPaymentRoutes);
