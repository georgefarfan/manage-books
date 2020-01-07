require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
require("./database");
// Initializations
const app = express();

// Settings
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  multer({
    storage
  }).single("image")
);

// Routes
app.use("/api/book", require("./routes/books"));

// Static files
app.use(express.static(path.join(__dirname, "/public")));

app.listen(app.get("port"), () => {
  console.log("Server on run port =>", app.get("port"));
});
