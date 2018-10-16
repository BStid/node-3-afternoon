const swag = require("../models/swag");
let read = (req, res, next) => {
  res.status(200).json(swag);
};

module.exports = {
  read
};
