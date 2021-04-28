const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const port = 3001;
const authRoutes = require("./server/routes/auth");
const snippetRoutes = require("./server/routes/snippet");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", authRoutes);
app.use("/api", snippetRoutes);

app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(port, () => console.log(`runnin in port ${port}`));
