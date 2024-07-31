import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { Gadget } from "./models/gadgets.js";

export const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/appliances", async (req, res) => {
  try {
    const appliances = await Gadget.find({});
    if (!appliances) {
      return res
        .status(404)
        .json({ message: "No appliances found", success: false });
    }
    return res.status(200).json({ appliances, success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Autochalit!" });
});
