// export functions to server.js
//Controller handling post POST request w/the server
const Post = require('../models/post');
const User = require('../models/user')


module.exports = app => {


    app.get('/posts/new', (req, res, post) => {
        var currentUser = req.user;

        res.render('post-new', { post, currentUser} )
    })



    app.post("/posts/new", (req, res) => {
        var currentUser = req.user
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;

        post
            .save()
            .then(post => {
                return User.findById(req.user._id)
            })
            .then(user => {
                user.posts.unshift(post);
                 user.save();
                // res.redirect(`/posts/post_.id`)
                // res.redirect(`/posts/${req.params.postId}`)
                res.redirect("/posts/" + post._id);
            })
            .catch(err => {
                console.log(err.message);
            });
    }
})
    //Create new DB object Called POST
    // app.post("/posts/new", (req, res) => {
    //     // Instance of POST model
    //     const post = new Post(req.body);
    //     // Save the model in DB
    //     post.save((err, post) => {
    //         // redirect
    //         return res.redirect(`/`);
    //     })
    //     console.log(req.body);
    // });

    app.get("/posts/:id", function(req, res) {
        var currentUser = req.user;

        //Look up the post
        Post.findById(req.params.id).populate('comments')
            .then(post => {
                res.render("post-show", { post, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    });
};
