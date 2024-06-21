const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./api");

const app = express();

//CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);

//Loging
app.use(morgan("combined"));
//JSON converting
app.use(express.json());
//API
app.use("/v1", api);

module.exports = app;
