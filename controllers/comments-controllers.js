const Comment = require('../models/comment');
const Post = require('../models/post')
const User = require('../models/user')

// /posts/{{post._id}}/comments
// /posts/:postId/comments
module.exports = (app) => {

        app.post("/posts/:postId/comments", (req, res, post) => {

            var currentUser = req.user

            if (currentUser) {
                console.log(currentUser);
                // Find The parent Post
                Post.findById(req.params.postId).exec((err, post) => {

                    // console.log(post.comments._id.author);

                    //unshift a new comment
                    let newComment = new Comment();
                    console.log(req.body);
                    newComment.content = req.body.content;
                    newComment.post = post._id;
                    // newComment.author = currentUser.username;
                    newComment.save().then((comment) => {
                        post.comments.unshift(comment._id);
                        post.save().then(() => {
                            //Redirect to parent post
                            return res.redirect(`/posts/` + post._id);
                        })
                    })
                });
            } else {
                res.send('401')
                console.log("Unauthorized..");

            }
        });


        // app.post("/posts/:postId/comments", function (req, res) {
        //     var currentUser = req.user
        //     if (req.user) {
        //         const comment = new Comment(req.body);
        //         comment.author = req.user._id;
        //
        //         comment
        //             .save()
        //             .then(comment => {
        //                 return Post.findById(req.params.postId)
        //             })
        //             .then(post => {
        //                 post.comments.unshift(comment);
        //                 return post.save()
        //             })
        //             .then(post => {
        //             res.redirect(`/posts/${req.params.postId}`)
        //         })
        //         .catch(err => {
        //             console.log(err);
        //
        //         })
        // } else {
        //     res.send('401')
        //     console.log("Unauthorized..");
        // }
        //
        // })

}
