// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/login", passport.authenticate("local"), function (req, res) {
    console.log("zach")
    console.log(req.user)
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/signup", function (req, res) {
      console.log(req.body)
    db.User.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
      user_dob: req.body.user_dob,
      user_location: req.body.user_location,
      user_drinks: req.body.user_drinks,
      user_liked_drinks: req.body.user_liked_drinks,
      user_disliked_drinks: req.body.user_disliked_drinks
    })
      .then(function () {
        res.redirect(307, "/login");
      })
      .catch(function (err) {
          console.log(err)
        res.status(401).json(err);
      });
  });

  
  //ROAD BLOCK TO ASK FOR TA'S AND WILL 

  app.put("/members",function(req, res){
    console.log(req.body.id)
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
    })
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};
