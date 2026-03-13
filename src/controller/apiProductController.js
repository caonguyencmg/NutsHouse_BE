import apiProductService from "../services/apiProductService";

let handleGetProducts = async (req, res) => {
  let status = req.query.status;
  let products = await apiProductService.getListProducts(status);
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

let handleDeleteProduct = async (req, res) => {
  let productId = req.body.id;
  if (!productId) {
    return res.status(200).json({
      errCode: 401,
      errMessage: "Missing required parameters!",
    });
  }

  let message = await apiProductService.deleteProduct(productId);
  return res.status(200).json(message);
};

let handleEditProduct = async (req, res) => {
  try {
    let products = await apiProductService.updateProduct({
      ...req.body,
      files: req.files,
    });

    return res.status(200).json({
      statusCode: 200,
      errMessage: "Ok",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      errMessage: "Server error",
    });
  }
};

module.exports = {
  handleGetProducts,
  handleEditProduct,
  handleCreateProduct,
  handleDeleteProduct,
};
