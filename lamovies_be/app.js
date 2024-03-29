var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var itemsRouter = require("./routes/items");
var authenRouter = require("./routes/authen");
var actorRouter = require("./routes/actors");
var movieRouter = require("./routes/movies");
var genreRouter = require("./routes/genres");
var pricingRouter = require("./routes/pricings");
var userPricingRouter = require("./routes/userPricings");

var app = express();

app.use(
    cors({
        origin: ["http://localhost:3001", "http://localhost:3002"],
        credentials: true,
    })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/authen", authenRouter);
app.use("/actors", actorRouter);
app.use("/movies", movieRouter);
app.use("/genres", genreRouter);
app.use("/pricings", pricingRouter);
app.use("/userPricings", userPricingRouter);

mongoose.connect("mongodb://127.0.0.1:27017/lamovies_api");
mongoose.connection.once("open", function () {
    console.log("thanh cong");
});
mongoose.connection.on("error", function () {
    console.log(" k thanh cong");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
