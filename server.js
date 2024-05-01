import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

// start server
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
