// var debug = true;
var cookieParser = require("cookie-parser");
//This defines proccess.env.SECRET
require('dotenv').config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const exphbs = require('express-handlebars');
const express = require('express');
const expressValidator = require('express-validator');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Post = require('./models/post');

var checkAuth = (req, res, next) => {
    console.log("checking Authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};

app.use(cookieParser());

// The bodyParser is used to parser the data entered on our front End
//necessary with POST routes
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(expressValidator()); // This comes after body parser initialization
// End BodyParser set up


app.use(checkAuth)

//TODO: Fix profiles pages
app.get('/user/profile', (req, res) => {
    var currentUser = req.user
    res.render('profile', { currentUser })
})


app.get('/', (req, res) => {
var currentUser = req.user;

    Post.find({})
        .then(posts => {
            res.render("posts-index", {
                posts, currentUser
            });
        })
        .catch(err => {
            console.log(err.message);
        });
})



app.get("/n/:subreddit", (req, res) => {
    var currentUser = req.user;

    Post.find({ subreddit: req.params.subreddit })
    .then(posts => {
        res.render("posts-index", { posts, currentUser });
    }).catch(err => {
        console.log(err);
    })
})


//.engine sets the view engine and default layout goes along with app.set
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
// End template engine set up
require('./controllers/auth.js')(app)
require('./controllers/posts.js')(app);
require('./data/reddit-clone-db');
require('./controllers/comments-controllers.js')(app);



app.listen(port, () => {
    console.log('App Listening on port 3000');
})
