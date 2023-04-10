const jwt = require("jsonwebtoken");

const userModel = require("../models/userModels");

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userId } = jwt.verify(token, "bmi_secret_key");
      req.user = await userModel.findById(userId).select("-password");
      next();
    } catch (e) {
      res.status(401).send({
        status: "failed",
        message: "unauthorized User",
      });
    }
  }
  if (!token) {
    res.status(401).send({
      status: "failed",
      message: "unauthorized User , No Token",
    });
  }
};

module.exports = checkUserAuth;
