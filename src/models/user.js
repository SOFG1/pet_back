const mongoose = require("mongoose")
const bcrypt = require("bcrypt");



const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Model = mongoose.model("user", userSchema);



const createUser = async (login, pass) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pass, salt);
    const newOne = {
        login,
        passwordHash,
      };
      const res = await Model.create(newOne);
      return res;
  };


  module.exports = {
    createUser
  }