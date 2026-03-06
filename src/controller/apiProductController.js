import apiProductService from "../services/apiProductService";

let handleGetProducts = async (req, res) => {
  let products = await apiProductService.getListProducts();
  return res.status(200).json({
    statusCode: 200,
    errMessage: "Ok",
    products,
  });
};

let handleCreateProduct = async (req, res) => {
  let message = await apiUserService.createProduct(req.body);
  return res.status(200).json(message);
};

let handleEditProduct = async (req, res) => {
  let products = await apiProductService.updateProduct();
  return res.status(200).json({
    statusCode: 200,
    errMessage: "Ok",
    products,
  });
};

module.exports = {
  handleGetProducts,
  handleEditProduct,
  handleCreateProduct,
};
