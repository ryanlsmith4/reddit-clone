// var debug = true;

const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const express = require('express');
const expressValidator = require('express-validator');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Post = require('./models/post');

// The bodyParser is used to parser the data entered on our front End
//necessary with POST routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator()); // This comes after body parser initialization
// End BodyParser set up

app.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            res.render("posts-index", {
                posts
            });
        })
        .catch(err => {
            console.log(err.message);
        });
})

app.get('/posts/new', (req, res) => {
    res.render('post-new')
})

app.get("/n/:subreddit", (req, res) => {
    Post.find({ subreddit: req.params.subreddit })
    .then(posts => {
        res.render("posts-index", { posts });
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
