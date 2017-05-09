// html-routes.js - this file offers a set of routes for sending users to the various html pages
// Dependencies
var path = require("path");
// Routes
module.exports = function(app) {
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/survey.html"));
  });
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });
};
