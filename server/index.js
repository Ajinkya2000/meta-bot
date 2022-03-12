const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const webpush = require("web-push");
const path = require("path");

// Route
const discordRoute = require("./discordRoute");

const app = express();
app.use(express.static(path.join(__dirname, "../client/build")));

webpush.setVapidDetails(
  "http://meta-bot-discord.herokuapp.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Add Route to app
app.use("/api", discordRoute);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
