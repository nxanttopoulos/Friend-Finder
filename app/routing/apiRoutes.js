// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// Dependencies
var friendData = require("../data/friends");
// Routes
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });
  // If a user sends data to add a new friend...
  app.post("/api/friends", function(req, res) {
    friendData.push(req.body);
    res.json(true);
  });
};