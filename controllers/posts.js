// export functions to server.js
//Controller handling post POST request w/the server
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user')


module.exports = (app) => {

    app.put("/posts/:id/vote-up", (req, res) => {
        Post.findById(req.params.id).exec((err, post) => {
            console.log(post);
            post.upVotes.push(req.user._id);
            post.voteScore = post.voteScore + 1;
            post.save()

            res.status(200)

        });
    });


    app.put("/posts/:id/vote-down", (req, res) => {
        Post.findById(req.params.id).exec((err, post) => {
            post.downVotes.push(req.user._id);
            post.voteScore = post.voteScore - 1;
            post.save()

            res.status(200)
        });
    });








    app.get('/posts/new', (req, res, post) => {
        var currentUser = req.user;

        res.render('post-new', {
            post,
            currentUser
        })
    })

    // CREATE flares
    app.post('/posts/new', (req, res) => {

        var currentUser = req.user
        if (req.user) {
            post.author = req.user._id;
            // INSTANTIATE INSTANCE OF FLARE MODEL
            const post = new Post(req.body);
            post.author = req.user._id;
            // SAVE INSTANCE OF EMBER MODEL TO DB

            post
                .save()
                .then((post) => {
                    return User.findById(post.author);
                })
                .then((user) => {
                    console.log("Herer--------" + user);
                    post.comments.unshift(post);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    res.redirect('/posts/' + post._id);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    });

    // app.post("/posts/new", (req, res) => {
    //     var currentUser = req.user
    //     if (req.user) {
    //         var post = new Post(req.body);
    //         post.author = req.user._id;
    //
    //         post
    //             .save()
    //             .then(post => {
    //                 return User.findById(req.user._id)
    //             })
    //             .then(user => {
    //                 user.posts.unshift(post);
    //                 user.save();
    //                 console.log("Here" + post);
    //
    //                 res.redirect("/posts/" + post._id);
    //             })
    //             .catch(err => {
    //                 console.log(err.message);
    //             });
    //     }
    // })


    // Getting individual posts
    // app.get('/posts/:id', function (req, res) {
    //     // Look up post, then render; if it doesn't work, error msg
    //     let currentUser = req.user;
    //     // Grab specific Post using url
    //     Post.findById(req.params.id)
    //     .then((post) => {
    //         res.render('post-show', { post, currentUser })
    //     }).catch((err) => {
    //         res.send(err.message)
    //     })
    // })



    // SHOW single flare
    app.get('/posts/:id', function(req, res) {
        var currentUser = req.user;
        // LOOK UP THE POST
        Post.findById(req.params.id)
            .populate('author')
            // .populate('embers')
            .then((post) => {
                res.render('post-show', {
                    post,
                    currentUser
                })
            }).catch((err) => {
                console.log(err.message)
            })
    });

    // app.get("/posts/:id", (req, res) => {
    //     var currentUser = req.user;
    //
    //     Post.findById(req.params.id).populate('comments')
    //
    //         .then(post => {
    //             var postId = post
    //             console.log("This is what we printed" + postId);
    //             console.log("DONE -------------------");
    //             Comment.findById(req.params.id
    //             ).then(comments => {
    //                 // console.log(post)
    //                 // console.log(comments);
    //                 res.render("post-show", {
    //                     postId: req.params.id,
    //                     'post': post,
    //                     'comments': comments,
    //                     'currentUser': currentUser
    //
    //                 });
    //             })
    //
    //
    //         }).catch(err => {
    //             console.log(err.message);
    //         })
    // })
}
