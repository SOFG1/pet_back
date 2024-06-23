const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path')
const api = require("./api");

const app = express();

app.use(cors());

//Loging
app.use(morgan("combined"));

//JSON converting
app.use(express.json());

//API
app.use("/v1", api);

//Static files
app.use('/uploads', express.static("uploads"))

module.exports = app;
