const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pokemon = require("./server/api/pokemon");

app.use("/pokemon", pokemon);

const port = process.env.NODEJS_PORT || 8000;

app.get("/", (req, res) => {
  res.send("Succesfull Response");
});

app.listen(port, console.log("start port"));