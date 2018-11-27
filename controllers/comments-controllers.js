const Comment = require('../models/comment');
const Post = require('../models/post')
const User = require('../models/user')
// /posts/{{post._id}}/comments
// /posts/:postId/comments
module.exports = function(app) {


    app.post("/posts/:postId/comments", function (req, res) {
        var currentUser = req.user
        if (req.user) {
            const comment = new Comment(req.body);
            comment.author = req.user._id;

            comment
                .save()
                .then(comment => {
                    return Post.findById(req.params.postId)
                })
                .then(post => {
                    post.comments.unshift(comment);
                    return post.save()
                })
                .then(post => {
                res.redirect(`/posts/${req.params.postId}`)
            })
            .catch(err => {
                console.log(err);

            })
    } else {
        res.send('401')
        console.log("Unauthorized..");
    }

    })

}
