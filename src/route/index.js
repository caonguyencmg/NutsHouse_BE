const apiUserRoute = require("./apiUserRoute");
const apiProductRoute = require("./apiProductRoute");

function initWebRoute(app) {
  app.use("/api", apiUserRoute);
  app.use("/product", apiProductRoute);
}
module.exports = initWebRoute;
