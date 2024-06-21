const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./api");

const app = express();

//CORS
//  origin: ["http://localhost:3000", "http://localhost:5173", "https://sofg1.github.io/pet_front/"],

app.use(cors());

//Loging
app.use(morgan("combined"));
//JSON converting
app.use(express.json());
//API
app.use("/v1", api);


app.get('/', (req, res) => {
  res.send('Hello World!')
})


module.exports = app;
