const { user } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(300).json({
        message: "Fill Your Details Properly",
      });
    }
    const findUser = await user.findOne({ email: email });
    if (!findUser) {
      return res.status(200).json({
        message: "Username/Email Not Found Please Signup ",
      });
    }
    let decPass = await bcrypt.compare(password, findUser.password);
    if (decPass) {
      let payload = {
        email: email,
        id: findUser._id,
        role: findUser.role,
      };
      payload = jwt.sign(payload, process.env.JWT_SECRET);
      return res
        .status(200)
        .cookie("token", payload, {
          httpOnly: true,
          expires: new Date(Date.now() + 30),
        })
        .json({
          message: "Successfully Logged-in",
        });
    } else {
      return res.status(300).json({ message: "Password Doesn't Match" });
    }
  } catch (error) {
    return res.status(300).json({ message: "Sorry Couldn't Sign You In" });
  }
};
const signup = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    if (!username || !email || !password || !role || password.length < 8) {
      return res.status(400).json({
        message: "Please Enter Your Details Properly ",
      });
    }
    const checkNew = await user.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (checkNew) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
    let hashPass = await bcrypt.hash(password, 10);
    await user.create({
      username: username,
      email: email,
      password: hashPass,
      role: role,
    });
    return res.status(200).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "User Couldn't Be Registered",
    });
  }
};
module.exports = { signup, login };
