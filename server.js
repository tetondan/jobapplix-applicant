const express = require("express");
const path = require("path");
const app = express();

app.use(function(req, res, next) {
  if (req.get("Host") === "localhost:3000") {
    next();
  } else if (req.get("X-Forwarded-Proto") !== "https") {
    console.log(req);
    res.redirect("https://" + req.get("Host") + req.url);
  } else next();
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000, () => {
  console.log("THis is what I'm talking about", __dirname);
});
