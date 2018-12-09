const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

module.exports = (app) => {
    //New Reply
    // /posts/{{post._id}}/comments/{{comment._id}}/replies/new
    app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
        var currentUser = req.user
        let post;
        Post.findById(req.params.postId)
            .then(post => {


                Comment.findById(req.params.commentId).then((comment) => {
                    console.log(comment);
                    res.render("replies-new", { "post": post, "comment" : comment, "currentUser": currentUser });
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    })


    // "/posts/:postId/comments/:commentId/replies"
    app.post('/posts/:postId/comments/:commentId/replies', (req, res, next) => {
   // redirect if not logged in
   const currentUser = req.user;
   if (currentUser === null) {


     return res.redirect('/login');
   }

   const username = currentUser.username;

   const postId = req.params.postId;
   const commentId = req.params.commentId;

   Post.findById(postId).then((post) => {
     console.log(">>> Found post:", post);
     const findComment = (id, comments) => {
       if (comments.length > 0) {
         for (var index = 0; index < comments.length; index++) {
           const comment = comments[index];
           if (comment._id == id) {
             console.log(">>> FOUND <<<<");
             return comment;
           }
           const foundComment = findComment(id, comment.comments);
           if (foundComment) {
             return foundComment;
           }
         }
       }
     };

     console.log("Step 1 find comment id -------------------");
     // console.log(">>> find nested Comment in post");
     // console.log(post.comments);
     const comment = findComment(commentId, post.comments); // post.comments.id(commentId);
     // const comment = post.comments.id(commentId);
     console.log(comment);
     // console.log(comment);
     // make a new comment
     const commentNew = new Comment({
       content: req.body.content,
       author: currentUser._id,
       postId,
       authorName: username
     });

     console.log(req.body.content);
     console.log("Step 2 unshift new comment ---------------------------");
     comment.comments.unshift(commentNew);
     post.markModified('comments');
     return post.save();
   }).then((post) =>{
     console.log("Step 3 Save post ---------------------------");
     console.log(post);
     res.redirect('/posts/'+post._id);
   }).catch((err)=>{
     console.log(err);
   });
 })


};
