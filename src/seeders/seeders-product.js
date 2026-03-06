"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Hạt dẻ cười",
        description:
          "Hạt dHạt dẻ cười cao cấp – lựa chọn hoàn hảo cho sức khỏe và đãi khách sang trọng. Hạt to, chắc, vỏ tự nứt tự nhiên, nhân xanh vàng đẹp mắt, vị béo bùi thơm ngon khó cưỡng. Sản phẩm giàu protein, chất béo tốt, vitamin và khoáng chất, giúp tốt cho tim mạch, trí não và hệ tiêu hóa. Hạt dẻ cười phù hợp cho mọi lứa tuổi, đặc biệt lý tưởng làm quà biếu lễ Tết, thể hiện sự tinh tế và lời chúc sung túc, may mắn. Thưởng thức mỗi ngày – ngon miệng, bổ dưỡng, an tâm chất lượng.",
        type: 1,
        price: 200000,
        img: "uploads/img.png",
        date: "12 tháng",
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hạt hạnh nhân rang bơ",
        description:
          "Hạnh nhân rang bơ cao cấp – thơm ngon khó cưỡng, ăn là ghiền. Hạt hạnh nhân to, đều, được rang chín vàng cùng bơ thơm béo, giòn rụm, vị mặn ngọt hài hòa, không ngấy. Sản phẩm giàu protein, chất béo tốt, vitamin E và chất xơ, hỗ trợ tim mạch, đẹp da và cung cấp năng lượng mỗi ngày. Phù hợp làm món ăn vặt lành mạnh, đãi khách tinh tế hoặc quà biếu sang trọng trong dịp lễ Tết. Hạnh nhân rang bơ – ngon miệng, bổ dưỡng, chất lượng đáng tin cậy.",
        type: 1,
        price: 130000,
        img: "uploads/img.png",
        date: "12 tháng",
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hạt Macca",
        description:
          "Hạt mắc ca cao cấp – “nữ hoàng của các loại hạt” với hương vị béo bùi, giòn nhẹ và thơm tự nhiên. Hạt to, chắc, tách vỏ dễ dàng, nhân trắng ngà hấp dẫn, ăn một lần là khó quên. Mắc ca giàu chất béo tốt, omega 3-6-9, protein và khoáng chất, hỗ trợ tim mạch, trí não và làm đẹp da. Phù hợp cho cả gia đình, dùng hằng ngày hoặc làm quà biếu sang trọng trong các dịp lễ Tết. Hạt mắc ca – dinh dưỡng tinh túy, ngon lành cho sức khỏe.",
        type: 1,
        price: 120000,
        img: "uploads/img.png",
        date: "12 tháng",
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hạt điều rang muối",
        description:
          "Hạt điều rang muối thơm ngon – món ăn vặt quen thuộc nhưng luôn được yêu thích. Hạt điều to, chắc, rang chín vàng đều, phủ lớp muối mặn nhẹ giúp giữ trọn vị bùi béo tự nhiên. Sản phẩm giàu protein, chất béo tốt và khoáng chất, hỗ trợ tim mạch, cung cấp năng lượng và tăng cường sức khỏe. Phù hợp dùng hằng ngày, đãi khách hoặc làm quà biếu ý nghĩa trong các dịp lễ Tết. Hạt điều rang muối – giòn ngon, bổ dưỡng, càng ăn càng mê.",
        type: 1,
        price: 135000,
        img: "uploads/img.png",
        date: "12 tháng",
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mít sấy giòn",
        description:
          "Mít sấy giòn thơm ngon – món ăn vặt hấp dẫn cho mọi lứa tuổi. Từng miếng mít chín vàng được sấy giòn tự nhiên, giữ trọn hương thơm đặc trưng và vị ngọt thanh, không quá gắt. Mít giòn rụm, dễ ăn, không dầu, không ngấy, càng ăn càng cuốn. Phù hợp làm món ăn vặt hằng ngày, nhâm nhi cùng trà hoặc đãi khách. Mít sấy giòn – thơm lừng vị trái cây nhiệt đới, tiện lợi, ngon miệng, ai ăn cũng thích.",
        type: 2,
        price: 120000,
        img: "uploads/img.png",
        date: "12 tháng",
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
