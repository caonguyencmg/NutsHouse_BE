import { col, fn, Op, where } from "sequelize";
import db from "../models/index";

let getBillUser = (phoneNumber, searchText, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bills = "";
      if (phoneNumber) {
        bills = await db.Bill.findAll({
          where: {
            phoneNumber: phoneNumber,
            isDelete: 0,
            status: status ? status : { [Op.or]: [0, 1, 2, 3] },
          },
        });
      } else {
        const whereClause = {
          isDelete: 0,
          status: status ? status : { [Op.or]: [0, 1, 2, 3] },
        };
        if (searchText && String(searchText).trim() !== "") {
          const q = String(searchText).trim().toLowerCase();

          whereClause[Op.or] = [
            where(fn("LOWER", col("fullName")), {
              [Op.like]: `%${q}%`,
            }),
            where(fn("LOWER", col("billsCode")), {
              [Op.like]: `%${q}%`,
            }),
            where(fn("LOWER", col("phoneNumber")), {
              [Op.like]: `%${q}%`,
            }),
          ];
        }

        bills = await db.Bill.findAll({
          where: whereClause,
          limit: 100, // default
          order: [["createdAt", "DESC"]],
        });
      }
      resolve(bills);
    } catch (error) {
      reject(error);
    }
  });
};

let handleUserLogin = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = await db.User.findOne({
        where: { username: userName },
        raw: true,
      });
      if (user) {
        let check = password == user.password ? true : false;
        if (check) {
          userData.status = 200;
          userData.message = "ok";
          delete user.password;
          userData.user = user;
        } else {
          userData.status = 401;
          userData.errMessage = `Authentication failed: Wrong password`;
        }
      } else {
        userData.status = 404;
        userData.errMessage = `User's not found`;
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserBills = (phoneNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bills = "";
      bills = await db.Bill.findAll({
        where: { phoneNumber: phoneNumber },
      });
      if (bills.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      reject(error);
    }
  });
};

let createBill = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Bill.create({
        billsCode: data.billsCode,
        fullName: data.fullname,
        phoneNumber: data?.phoneNumber,
        address: data?.address,
        productId: data.productId,
        totalPrice: data.total,
        status: data.status || 0,
      });
      console.log("🚀 ~ createBill ~ data.productId:", data.productId);
      const products = JSON.parse(data.productId);

      //update số lượng sản phẩm còn lại vào db
      for (const item of products) {
        const product = await db.Product.findOne({
          where: { id: item.productId },
          raw: false,
        });

        if (!product) {
          throw new Error(`Không tìm thấy sản phẩm id=${item.productId}`);
        }
        product.quantity -= item.quantity;
        await product.save();
      }

      resolve({
        status: 200,
        message: "ok",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteBill = (id) => {
  return new Promise(async (resolve, reject) => {
    let product = await db.Bill.findOne({ where: { id: id } });
    if (!product) {
      resolve({
        status: 404,
        errMessage: "Đơn hàng không tồn tại",
      });
    }
    let bill = await db.Bill.findOne({ where: { id: id }, raw: false });
    if (bill) {
      bill.isDelete = 1;
      await bill.save();
      resolve({
        status: 200,
        message: "Xoá đơn hàng thành công",
      });
    }
  });
};

let updateBill = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          status: 501,
          errMessage: "Có lỗi xảy ra,vui lòng thử lại!",
        });
      }
      let bill = await db.Bill.findOne({ where: { id: data.id }, raw: false });
      if (bill) {
        bill.fullname = data.fullname;
        bill.phoneNumber = data.phoneNumber;
        bill.address = data.address;
        bill.productId = data.productId;
        bill.total = data.total;
        bill.status = data.status;
        await bill.save();
        resolve({
          status: 200,
          message: "Cập nhật đơn hàng thành công!",
        });
      } else {
        resolve({
          status: 404,
          errMessage: "Có lỗi xảy ra,vui lòng thử lại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getBillUser,
  handleUserLogin,
  createBill,
  deleteBill,
  updateBill,
};
