const Comment = require('../models/comment');
const Post = require('../models/post')
// /posts/{{post._id}}/comments
// /posts/:postId/comments
module.exports = function(app) {

app.post("/posts/:postId/comments", function(req, res) {
    //Instantiate Instance of model
    const comment = new Comment(req.body);

    //Save Instance to DB
    comment
    .save()
    .then(comment => {
        // redirect to comments show
        return Post.findById(req.params.postId);
        // return res.redirect(`/posts/${req.params.postId}`);
    })
    .then(post => {
        post.comments.unshift(comment);
        return post.save()
    })
    .then(post => {
        res.redirect(`/posts/${req.params.postId}`);
    })
    .catch(err => {
        console.log(err);
    })
})

}
