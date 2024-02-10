const express = require("express");
const {
  createUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  login,
} = require("../controller/user");

const router = express.Router();

// as per the task ,no need to implement role based restriction, so any one can delete or update or get user
router.get("/user/:id", getUser);
router.get("/users", getAllUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// register user
router.post("/user", createUser);

// login user / admin
router.post("/login", login);

module.exports = router;
