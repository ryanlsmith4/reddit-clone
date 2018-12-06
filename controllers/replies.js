const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

module.exports = (app) => {
    //New Reply
    // /posts/{{post._id}}/comments/{{comment._id}}/replies/new
    app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
        let post;
        Post.findById(req.params.postId)
            .then(p => {
                post = p;
                return Comment.findById(req.params.commentId);
            })
            .then(comment => {
                res.render("replies-new", { post, comment });
            })
            .catch(err => {
                console.log(err.message);
            })
    })

    //Create Reply
    app.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
        console.log(req.body);
    });
};
