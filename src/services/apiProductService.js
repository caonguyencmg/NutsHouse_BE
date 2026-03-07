import { Op, where } from "sequelize";
import db from "../models/index";

let getListProducts = (status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let whereCondition = {
        isDelete: 0,
      };

      if (status == 1) {
        whereCondition.quantity = {
          [Op.gt]: 0, // quantity > 0
        };
      } else if (status == 0) {
        whereCondition.quantity = {
          [Op.lte]: 0, // quantity <= 0
        };
      }

      const products = await db.Product.findAll({
        where: whereCondition,
        order: [["createdAt", "DESC"]],
      });
      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
};

let createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Thiếu ảnh sản phẩm" });
      }

      const imagePath = `/uploads/products/${req.file.filename}`;

      await db.Product.create({
        name: data.name,
        description: data.description,
        price: data?.price,
        quantity: data?.quantity,
        date: data.date,
        img: imagePath,
      });

      resolve({
        status: 200,
        message: "ok",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateProduct = (data) => {
  const files = data.files; // mảng file mới (nếu có)
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        return resolve({
          status: 400,
          errMessage: "Thiếu id sản phẩm",
        });
      }

      const product = await db.Product.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (!product) {
        return resolve({
          status: 404,
          errMessage: "Không tìm thấy sản phẩm",
        });
      }

      // ảnh cũ (array)
      let imageList = [];
      try {
        imageList = product.imgs ? JSON.parse(product.imgs) : [];
      } catch {
        imageList = [];
      }

      // nếu có upload ảnh mới
      let oldImages = data.oldImages || [];

      if (!Array.isArray(oldImages)) {
        oldImages = [oldImages];
      }

      imageList = [...oldImages];

      // nếu có upload ảnh mới
      if (files && files.length > 0) {
        const newImages = files.map(
          (file) => `/uploads/products/${file.filename}`,
        );

        imageList = [...imageList, ...newImages];
      }

      // update field
      product.name = data.name;
      product.description = data.description;
      product.price = data.price;
      product.quantity = data.quantity;
      product.date = data.date;
      product.img = JSON.stringify(imageList);

      await product.save();

      resolve({
        status: 200,
        message: "Cập nhật sản phẩm thành công!",
      });
    } catch (error) {
      // rollback nếu lỗi
      if (files && files.length > 0) {
        files.forEach((file) => {
          const rollbackPath = path.join(
            __dirname,
            "..",
            "..",
            "uploads/products",
            file.filename,
          );
          if (fs.existsSync(rollbackPath)) {
            fs.unlinkSync(rollbackPath);
          }
        });
      }
      reject(error);
    }
  });
};

let deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    let product = await db.Product.findOne({ where: { id: id }, raw: false });
    if (product) {
      product.isDelete = 1;
      await bill.save();
      resolve({
        status: 200,
        message: "Xoá đơn hàng thành công",
      });
    }
  });
};
// let getBillUser = (userId, searchText) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let users = "";
//       if (userId === "All") {
//         const whereClause = {};
//         if (searchText && String(searchText).trim() !== "") {
//           const q = String(searchText).trim().toLowerCase();

//           whereClause[Op.or] = [
//             where(fn("LOWER", col("fullname")), {
//               [Op.like]: `%${q}%`,
//             }),
//             where(fn("LOWER", col("email")), {
//               [Op.like]: `%${q}%`,
//             }),
//             where(fn("LOWER", col("phoneNumber")), {
//               [Op.like]: `%${q}%`,
//             }),
//           ];
//         }

//         users = await db.User.findAll({
//           where: whereClause,
//           limit: 20, // default
//           order: [["createdAt", "DESC"]],
//         });
//       }
//       if (userId && userId !== "All") {
//         users = await db.User.findOne({
//           where: { id: userId },
//         });
//       }
//       resolve(users);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
module.exports = {
  getListProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
