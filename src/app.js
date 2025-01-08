const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const api = require("./api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Loging
app.use(morgan("combined"));

//JSON converting
app.use(express.json());

//API
app.use("/v1", api);

//Static files
app.use("/uploads", express.static("uploads"));

//Stream///////////////////////////////////
let clients = [];
let facts = [];
app.use(bodyParser.urlencoded({ extended: false }));

function eventsHandler(request, response, next) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  response.write(data);
  response.write(`data: ${JSON.stringify({ data: "test" })}\n\n`);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  resp = response;

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

function sendEventToAll() {
  clients.forEach((c) => {
    c.response.write(
      `data: ${JSON.stringify({ data: "new event !!!!!!!!!!!!!" })}\n\n`
    );
    console.log("sent");
  });
}

setInterval(() => {
  sendEventToAll();
}, 3000);

app.get("/stream", eventsHandler);

module.exports = app;
