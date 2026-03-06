import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./route/index";
import connectDB from "./config/connectDB";
var cors = require("cors");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
viewEngine(app);

initWebRoute(app);

connectDB();

//if Port === undefined => port = 2609
let port = process.env.PORT || 2609;
app.listen(port, () => {
  console.log(`Backend Nodejs listening on port http://localhost:${port}`);
});
