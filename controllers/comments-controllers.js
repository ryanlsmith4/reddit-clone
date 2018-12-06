const Comment = require('../models/comment');
const Post = require('../models/post')
const User = require('../models/user')

// /posts/{{post._id}}/comments
// /posts/:postId/comments
module.exports = (app) => {

        app.post("/posts/:postId/comments", (req, res, post) => {
            // yopu should have your promise give you back the comments
            // that way you can set the author befopre associating with the post
            var currentUser = req.user
            console.log("here");
            if (currentUser) {
                console.log(currentUser);
                // Find The parent Post
                Post.findById(req.params.postId).exec((err, post) => {
                    console.log("here");
                    // console.log(post.comments._id.author);
                    // i think you might have to look for the comment in then
                    // then set the author
                    // post.comments.author = currentUser
                    console.log("here", currentUser);
                    //unshift a new comment
                    post.comments.unshift(req.body);
                    console.log("there");
                    // Save mongoose document
                    post.save();
                    console.log("everywhere");

                    //Redirect to parent post
                    return res.redirect(`/posts/` + post._id);
                    console.log("obv not here");

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
