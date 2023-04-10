const express = require("express");
const {
  userRegister,
  userLogin,
  getAllUser,
  changePassword,
  loggedInUser,
  calculateBMI,
  addCalculateHistory,
  deleteCalculateHstory,
} = require("../controller/userController");
const checkUserAuth = require("../middlewares/auth.middleware");

const router = express.Router();

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.get("/", asyncHandler(getAllUser));

router.post("/", asyncHandler(userRegister));

router.post("/login", asyncHandler(userLogin));

router.post("/changePassword",checkUserAuth, asyncHandler(changePassword));

router.get("/loggedin",checkUserAuth ,asyncHandler(loggedInUser));

router.post("/bmi", checkUserAuth ,asyncHandler(calculateBMI));

router.put("/add/history",checkUserAuth , asyncHandler(addCalculateHistory));

router.put("/delete/history/:id", checkUserAuth ,asyncHandler(deleteCalculateHstory));


module.exports = router;