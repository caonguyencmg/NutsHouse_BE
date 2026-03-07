import db from "../models/index";
import apiUserService from "../services/apiUserService";

let handleLogin = async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  if (!userName || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs paremeter!",
    });
  }
  let userData = await apiUserService.handleUserLogin(userName, password);
  return res.status(200).json({
    status: userData.status,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};

let handleGetBill = async (req, res) => {
  let phoneNumber = req.query.phoneNumber;
  let searchText = req.query.searchText || "";
  let status = req.query.status;
  let billsCode = req.query.billsCode;
  let bills = await apiUserService.getBillUser(
    phoneNumber,
    searchText,
    status,
    billsCode,
  );
  return res.status(200).json({
    status: 200,
    errMessage: "Ok",
    bills,
  });
};

let handleCreateBill = async (req, res) => {
  let message = await apiUserService.createBill(req.body);
  return res.status(200).json(message);
};

let handleDeleteBill = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 401,
      errMessage: "Missing required parameters!",
    });
  }

  let message = await apiUserService.deleteBill(req.body.id);
  return res.status(200).json(message);
};

let handleEditBill = async (req, res) => {
  let data = req.body;
  let message = await apiUserService.updateBill(data);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  handleGetBill,
  handleCreateBill,
  handleEditBill,
  handleDeleteBill,
};
