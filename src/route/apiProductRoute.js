import express from "express";
import upload from "../middleware/upload";
const router = express.Router();

const apiProductController = require("../controller/apiProductController");

router.get("/get-list", apiProductController.handleGetProducts);
router.put(
  "/edit-product",
  upload.array("newImages", 5),
  apiProductController.handleEditProduct,
);
router.post(
  "/create-product",
  upload.array("images", 5),
  apiProductController.handleCreateProduct,
);
router.put("/delete-product", apiProductController.handleDeleteProduct);

module.exports = router;
