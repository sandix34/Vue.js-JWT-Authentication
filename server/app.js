// use the express framework
var express = require("express");
// manage file and folder paths in the server file system
var path = require("path");
const index = require("./routes");

const mongoose = require("mongoose");
const dotenv = require ('dotenv'); 
dotenv.config ();

// database connexion
const db = process.env.MONGODB_CONNECT
mongoose.connect(db, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  },
  err => {
    if (err) {
      console.log('ERROR DB')
    } else {
      console.log('connexion db 👍')
    }
  }
);

var app = express();

// middleware to parse the body of requests containing JSON
app.use(express.json());
// to parse body which are in url-encoded format
app.use(express.urlencoded({ extended: false }));
// middleware to serve the static files of the Vue application
app.use(express.static(path.join(__dirname, "../client-build")));

app.use(index);

// all GET requests return the Vue application's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client-build/index.html"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

module.exports = app;
