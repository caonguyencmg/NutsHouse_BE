import express from "express";
import upload from "../middleware/upload";
const router = express.Router();

const apiProductController = require("../controller/apiProductController");

router.get("/get-list", apiProductController.handleGetProducts);
router.get(
  "/edit-product",
  upload.array("images", 5),
  apiProductController.handleEditProduct,
);
router.get(
  "/create-product",
  upload.array("images", 5),
  apiProductController.handleCreateProduct,
);

module.exports = router;
