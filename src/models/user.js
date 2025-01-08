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
    experience: {
      type: Number,
      default: 0,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
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
  const objUser = await Model.findOne({ _id: objUserId });
  if (!objUser.likes.includes(subjUserId)) {
    console.log("no");
    objUser.likes = [...objUser.likes, subjUserId];
    const saved = await objUser.save();
    return saved;
  }
  if (objUser.likes.includes(subjUserId)) {
    console.log("yes");
    objUser.likes = objUser.likes.filter((id) => id.toString() !== subjUserId);
    const saved = await objUser.save();
    return saved;
  }
};

const increaseAllUsersExp = async () => {
  const res = await Model.updateMany({}, { $inc: { experience: 1 } });
  console.log(res)
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
  increaseAllUsersExp,
};
