const User = require("../models/user");

module.exports = (app) => {
    //signup
    app.get("/sign-up", (req, res) => {
        res.render("sign-up")
    })

    // SIGN UP POST
    app.post("/sign-up", (req, res) => {
      // Create User
      const user = new User(req.body);

      user
        .save()
        .then(user => {
          res.redirect("/");
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };
