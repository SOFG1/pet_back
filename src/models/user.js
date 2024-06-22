const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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

const changeUserPass = async (_id, pass) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(pass, salt);
  const res = await Model.findOneAndUpdate({_id}, {passwordHash});
  return res?._doc;
};

const findUser = async (login) => {
  const res = await Model.findOne({ login });
  return res?._doc;
};

const findUserById = async (_id) => {
  const user = await Model.findOne({ _id });
  return user._doc;
};


const deleteUser = async (_id) => {
 return await Model.findOneAndDelete({ _id });
};

module.exports = {
  createUser,
  findUser,
  findUserById,
  deleteUser,
  changeUserPass
};
