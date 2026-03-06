import express from "express";
const router = express.Router();

const apiUserController = require("../controller/apiUserController");

router.post("/login", apiUserController.handleLogin);
router.get("/get-bill", apiUserController.handleGetBill);
router.post("/create-bill", apiUserController.handleCreateBill);
router.put("/edit-bill", apiUserController.handleEditBill);
router.put("/delete-bill", apiUserController.handleDeleteBill);

//destroy
// router.delete("/delete-bill", apiUserController.handleDeleteBill);

module.exports = router;
