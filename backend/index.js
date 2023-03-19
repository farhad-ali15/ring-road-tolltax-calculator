import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import tollTaxRouter from "./routes/tollRoutes.js";
import dbConnect from "./configDb/configDb.js";
import { errorHandler } from "./middleware/errorHandlers.js";
const app = express();
dbConnect();

app.use(cors());
// Set up middleware to parse request bodies
app.use(bodyParser.json()); // Global middleware

app.use("/", tollTaxRouter);
app.use(errorHandler);

// Start the server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
