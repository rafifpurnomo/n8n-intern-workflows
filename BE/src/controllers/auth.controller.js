require("dotenv").config();
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [usersFound] = await userModel.searchByEmail(email);
    if (usersFound.length > 0) {
      const user = usersFound[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return res.status(200).json({
          massage: "Login succesful",
          token,
        });
      }
    }

    return res.status(400).json({
      massage: "Email atau Password Salah",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const register = async (req, res) => {
  const { nama_depan, nama_belakang, email, password } = req.body;

  try {
    const [emailFound] = await userModel.searchByEmail(email);
    if (emailFound.length > 0) {
      return res.status(400).json({ message: "email telah terdaftar" });
    } else {
      await userModel.addUsers(nama_depan, nama_belakang, email, password);
      return res.status(200).json({ message: "Akun anda telah terdaftar" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserLoggedIn = async (req, res) => {
  try {
    const [response] = await userModel.searchByID(req.id);
    if (response.length > 0) {
      return res.json({ message: "user found", data: response });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

module.exports = {
  login,
  register,
  getUserLoggedIn,
};
