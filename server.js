var debug = true;

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

app.get('/post-new', (req, res) => {
    res.render('post-new')
})

mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://localhost/redditclone",
    //useMongoClient is no longer required in mongo 5.x
    // { useMongoClient: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set('debug', true);


//.engine sets the view engine and default layout goes along with app.set
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
// End template engine set up

require('./controllers/posts.js')(app);
require('./data/reddit-clone-db');



app.listen(port, () => {
    console.log('App Listening on port 3000');
})
