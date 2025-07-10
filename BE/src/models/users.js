const conn = require("../config/db.config");
const bcrypt = require("bcrypt");

const getAllUsers = () =>{
    const QUERY = "SELECT * FROM users";
    return conn.execute(QUERY);
}

const addUsers = async (nama_depan, nama_belakang, email, plainpassword) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(plainpassword, saltRounds);
  const SQLQuery =
    "INSERT INTO users (nama_depan, nama_belakang, email , password) VALUES (? ,?, ?, ?)";
  return conn.execute(SQLQuery, [
      nama_depan,
      nama_belakang,
      email,
      hashedPass,
  ]);
};

const searchByID = async (id) => {
  const SQLQuery = "SELECT * FROM users WHERE id = ? ";
  return conn.execute(SQLQuery, [id]);
};

const searchByEmail = async (email) => {
  const SQLQuery = "SELECT * FROM users WHERE email = ? ";
  return conn.execute(SQLQuery, [email]);
};

module.exports = {
    getAllUsers,
    addUsers,
    searchByID,
    searchByEmail
}