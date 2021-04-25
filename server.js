const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const bodyParser = require("body-parser");
const snippetRoutes = require("./server/routes/snippets");
const authRoutes = require("./server/routes/auth");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", snippetRoutes);
app.use("/api", authRoutes);

app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(port, () => console.log(`runnin in port ${port}`));
