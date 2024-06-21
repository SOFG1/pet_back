const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Model = mongoose.model("todo", schema);

async function getAllTodos() {
  return await Model.find({}).sort({ id: 1 });
}

async function getLatestId() {
  const item = await Model.findOne().sort("-id");
  return item?.id || 0;
}

async function addNewTodo(todoText) {
  const latestId = await getLatestId();
  const newOne = {
    id: latestId + 1,
    text: todoText,
  };
  const res = await Model.create(newOne);
  return res;
}

module.exports = {
  addNewTodo,
  getAllTodos,
};
