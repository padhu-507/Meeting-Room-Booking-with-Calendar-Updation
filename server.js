const express = require("express");
var con = require("./connection");
var expressSession = require("express-session");
var flash = require("express-flash");
const { roomData } = require("./controllers/calendarController");

var app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: "star",
    cookie: { maxAge: 14400000 },
  })
);
app.use(flash());

app.get("/index", function (req, res, next) {
  res.render("index", {
    title: "Home Page",
    success: " ",
    error: " ",
  });
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.message = req.flash();
  next();
});

app.use("", require("./routes/authRoutes"));
app.use("", require("./routes/roomRoutes"));
app.use("", require("./routes/cardRoutes"));
app.use("", require("./routes/calendarRoutes"));

app.listen(5000, () => console.log("server is running at port no : 5000"));
