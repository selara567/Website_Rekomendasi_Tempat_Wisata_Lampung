const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");

const app = express();

const adminRoutes = require("./routes/adminroutes");
const publicRoutes = require("./routes/publicroutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "wisata-lampung-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

app.use(express.static(path.join(__dirname, "public")));

// setting ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect("mongodb://127.0.0.1:27017/wisata_lampung")
  .then(() => console.log("MongoDB berhasil terhubung"))
  .catch((err) => console.log("MongoDB gagal terhubung:", err));

app.use("/", publicRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});