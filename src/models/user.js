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
    photoName: {
      type: String,
    },
    likes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  const res = await Model.findOneAndUpdate({ _id }, { passwordHash });
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

const changeUserPhoto = async (_id, photoName) => {
  const user = await Model.findOneAndUpdate(
    { _id },
    { photoName: `/uploads/${photoName}` },
    { new: true }
  );
  return user._doc;
};

const getUsers = async (offset) => {
  const count = await Model.find({}).count();
  const users = await Model.find({}).skip(offset).limit(5);
  return { users, count };
};

const setLike = async (subjUserId, objUserId) => {
  const subjUser = await Model.findOne({ _id: subjUserId });
  const objUser = await Model.findOneAndUpdate(
    { _id: objUserId },
    { likes: objUserId }
  );
  return objUser;
};

module.exports = {
  createUser,
  findUser,
  findUserById,
  deleteUser,
  changeUserPass,
  changeUserPhoto,
  getUsers,
  setLike,
};
