const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../client/build")));

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
