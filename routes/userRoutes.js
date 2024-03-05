const express = require("express");
const router = express.Router();
const {
  register,
  login,
  update,
  deleteUser,
  getAllUsers,
  resetPassword,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser);
router.get("/getall", getAllUsers);
router.post("/reset-password", resetPassword);
module.exports = router;
