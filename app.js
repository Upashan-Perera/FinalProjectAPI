var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Configure DB connectivity
var mongoose = require("mongoose");
var configs = require("./config/globals");

var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;
// Import CORS to fix fetch error in SwaggerUI 
var cors = require("cors");
// Packages for Documenting the API
var swaggerUI = require("swagger-ui-express");
// Manual documentation approach, load YAML file into object and to render it
var YAML = require("yamljs");
var swaggerDocument = YAML.load("./documentation/api-specification.yaml");
// Comments approach
var swaggerJSDoc = require("swagger-jsdoc");
var options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Tracker API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://finalprojectapi-dev.onrender.com/api"
      }
    ]
  },
  apis: ["./routes/api/*.js"], // paths to files containing annotations
}
var swaggerSpec = swaggerJSDoc(options);
// // Load file from URL
var specfileURL = "http://petstore.swagger.io/v2/swagger.json";
var optionsForURL = {
  swaggerOptions: {
    url: specfileURL
  }
}
var indexRouter = require('./routes/index');
var cryptosRouter = require('./routes/api/cryptos');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Enable Documentation Section
// 1) Loading a yaml document loaded in swaggerDocument object
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// // 2) Alternative approach generating documentation from comments
app.use("/docs-alt", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// // 3) Loading existing file hosted in the cloud
app.use("/docs-cloud", swaggerUI.serve, swaggerUI.setup(null, optionsForURL));
// Initialize passport and strategy before routes definition
app.use(passport.initialize());
// Basic Strategy uses base64 encoded string with format 'username:password'
passport.use(
  new BasicStrategy((username, password, done) => {
    // Provide code to find user and validate password
    // hardcode credentials admin:default
    // Valid login YWRtaW46dXBhc2hhbjEyMw==
    if (username == "admin" && password == "upashan123") {
      console.log(`User ${username} authenticated successfully!`);
      return done(null, username);
    } else {
      console.log(`User ${username} authentication failed!`);
      return done(null, false); // false means no user was accepted
    }
    // Example with mongoose model from https://github.com/jaredhanson/passport-http
    // Add a user.js model in /models
    // Add a signup page and handle adding user to the DB
    // Replace the hardcoded user with the code below:
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false);
    //   }
    //   if (!user.verifyPassword(password)) {
    //     return done(null, false);
    //   }
    //   return done(null, user);
    // });
  })
);



app.use('/', indexRouter);
app.use(
  "/api/cryptos",
  passport.authenticate("basic", { session: false }),
  cryptosRouter
);
app.use("/api/cryptos",cryptosRouter);
// app.use('/users', usersRouter);

// Connect to DB after router/controller configuration
mongoose
  .connect(configs.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((message) => {
    console.log("App connected successfully!");
  })
  .catch((error) => {
    console.log("Error while connecting: " + error);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
