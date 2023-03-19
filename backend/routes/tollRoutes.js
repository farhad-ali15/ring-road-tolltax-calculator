import tollController from "../controllers/tollController.js";
import express from "express";

const tollTaxRouter = express.Router();
tollTaxRouter.route("/calculate-toll").post(tollController);

export default tollTaxRouter;
