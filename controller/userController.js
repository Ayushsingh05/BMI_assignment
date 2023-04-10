const userModel = require("../models/userModels");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find().sort("-createdAt");
    res.status(200).send({
      status: "success",
      data: users,
    });
  } catch (e) {
    res.status(504).send({
      status: "failed",
      data: e.message,
    });
  }
};
const userRegister = async (req, res) => {
  const data = req.body;
  const user = await userModel.findOne({ email: data.email });

  if (user) {
    res.status(404).send({
      status: "failed",
      message: "Email already exists",
    });
  } else {
    if (data.name && data.email && data.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        const newUser = new userModel({
          name: data.name,
          email: data.email,
          password: hashPassword,
        });
        const temp = await userModel.create(newUser);
        const registeredUser = userModel.findOne({ email: data.email });

        const token = jwt.sign(
          { userId: registeredUser._id },
          "bmi_secret_key",
          { expiresIn: "5d" }
        );

        res.status(201).send({
          status: "success",
          message: "User Registered Successfully",
          token: token,
        });
      } catch (e) {
        res.status(504).send({
          status: "failed",
          message: e.message,
        });
      }
    } else {
      res.status(404).send({
        status: "failed",
        message: "All fields are required",
      });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await userModel.findOne({ email: email });
      const token = jwt.sign({ userId: user._id }, "bmi_secret_key", {
        expiresIn: "5d",
      });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch && user.email === email) {
          res.status(200).send({
            status: "success",
            message: "Login Successfull",
            token: token,
          });
        } else {
          res.status(404).send({
            status: "failed",
            message: "Email or password is incorrect",
          });
        }
      } else {
        res.status(404).send({
          status: "failed",
          message: "User is not Registered",
        });
      }
    } else {
      res.status(404).send({
        status: "failed",
        message: "All fields are required",
      });
    }
  } catch (e) {
    res.status(504).send({
      status: "failed",
      message: "User is not Registered",
    });
  }
};

const changePassword = async (req, res) => {
  const data = req.body;
  const id = req.user._id;
  const { password, confirmPassword } = data;
  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      res.status(404).send({
        status: "failed",
        message: "Password does not match",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await userModel.findByIdAndUpdate(id, {
        $set: {
          password: hashPassword,
        },
      });
      res.status(200).send({
        status: "success",
        message: "Password Updated Successfully",
      });
    }
  } else {
    res.status(404).send({
      status: "failed",
      message: "All fields are required",
    });
  }
};

const loggedInUser = async (req, res) => {
  const data = req.user;
  res.status(200).send({
    user: data,
  });
};

const calculateBMI = async (req, res) => {
  const { heightFeet, weightKg } = req.body;
  // Conversion of  height from feet to meters
  const heightMeters = heightFeet / 3.281;

  const bmi = weightKg / (heightMeters * heightMeters);

  res.status(200).send(bmi.toFixed(2));
};

const addCalculateHistory = async (req, res) => {
  const { height, weight, result, date } = req.body;
  const userId = req.user._id;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const newCalculation = { height, weight, result, date };
    user.calculateHistory.push(newCalculation);
    await user.save();

    res.status(201).json(user.calculateHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteCalculateHstory = async (req, res) => {
  const userId = req.user._id;
  const calcId = req.params.id;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const calcIndex = user.calculateHistory.findIndex(
      (calc) => calc._id.toString() === calcId
    );

    if (calcIndex === -1) {
      return res.status(404).json({ msg: "Calculation not found" });
    }

    user.calculateHistory.splice(calcIndex, 1);
    await user.save();

    res.status(200).json(user.calculateHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  userRegister,
  userLogin,
  changePassword,
  loggedInUser,
  getAllUser,
  calculateBMI,
  addCalculateHistory,
  deleteCalculateHstory,
};
