const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../functions/user");

exports.createUser = async (req, res) => {
  try {
    const { name, email, address, contactNumber, gender, password } = req.body;

    if (!name || !email || !address || !password || !contactNumber || !gender) {
      return res.status(400).json({
        message: "Please Enter All Fields",
      });
    }
    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(400).json({
        message: "Email is taken",
      });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      address,
      contactNumber,
      gender,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
      expiresIn: "7d",
    });

    res.status(200).json({
      _id: user._id,
      name,
      email,
      contactNumber,
      gender,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const comparedPassword = await comparePassword(password, user.password);

      if (comparedPassword) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
          expiresIn: "7d",
        });

        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          contactNumber: user.contactNumber,
          gender: user.gender,
          token,
        });
      } else {
        res.status(400).json({
          message: "Email Or Password is wrong",
        });
      }
    } else {
      res.status(400).json({
        message: "No User Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "user create failed",
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -__v -role");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "get user failed",
    });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -__v -role");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "get users failed",
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, contactNumber, gender } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        email,
        address,
        contactNumber,
        gender,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "get users failed",
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.deleteOne({ _id: id });
    res.status(200).json("Deleted Successfully!!");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "delete user failed",
    });
  }
};
