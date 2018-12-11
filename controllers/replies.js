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
                    res.render("replies-new", { post , comment, currentUser });
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    })


    // "/posts/:postId/comments/:commentId/replies"
    // CREATE REPLY
// app.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
//   // LOOKUP THE PARENT POST
//   Post.findById(req.params.postId)
//     .then(post => {
//       // FIND THE CHILD COMMENT
//       var comment = post.comments.id(req.params.commentId);
//       // ADD THE REPLY
//       comment.comments.unshift(req.body);
//       // SAVE THE CHANGE TO THE PARENT DOCUMENT
//       return post.save();
//     })
//     .then(post => {
//       // REDIRECT TO THE PARENT POST#SHOW ROUTE
//       res.redirect("/posts/" + post._id);
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });









// CREATE NESTED EMBER
// TODO: find a way to prevent unauthorized users
// from accessing this ROUTE or variable URL via Middleware
// akin to checkAuth in server.js
app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
    var currentUser = req.user
      if (currentUser === null) {


        return res.redirect('/login');
      }
    // INSTANTIATE INSTANCE OF EMBER MODEL
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment.postId = req.params.postId
    comment
        .save()
        // Find Parent Comment
        .then(() => {
            return Comment.findById(req.params.commentId)
        })
        .then((parent) => {
            parent.comments.unshift(comment)
            parent.save()
        })
        // Find the Pyromancer author
        .then(() => {
            return User.findById(req.user._id);
        })
        // Save the author's posts
        .then((user) => {
            user.comments.unshift(comment);
            user.save();
        })
        // Redirect to original Post
        .then(() => {
            res.redirect('/posts/' + req.params.postId);
        })
        .catch((err) => {
            console.log(err.message);
        });
});



 //    app.post('/posts/:postId/comments/:commentId/replies', (req, res, next) => {
 //   // redirect if not logged in
 //   const currentUser = req.user;
 //   if (currentUser === null) {
 //
 //
 //     return res.redirect('/login');
 //   }
 //
 //   const username = currentUser.username;
 //
 //   const postId = req.params.postId;
 //   const commentId = req.params.commentId;
 //
 //   Post.findById(postId).populate("comments").then((post) => {
 //     console.log(">>> Found post:", post);
 //     console.log("Step 1 find comment id -------------------");
 //     // console.log(">>> find nested Comment in post");
 //     // console.log(post.comments);
 //
 //     const comment = findComment(commentId, post.comments); // post.comments.id(commentId);
 //     // const comment = post.comments.id(commentId);
 //     console.log("here is am-------" + comment)
 //     console.log(comment.comments)
 //
 //     // console.log(comment);
 //     // make a new comment
 //     const commentNew = new Comment({
 //       content: req.body.content,
 //       author: currentUser._id,
 //       postId: postId,
 //       authorName: username
 //   });
 //
 //     console.log("Step 2 unshift new comment ---------------------------");
 //     console.log("commentNew is -----" + commentNew);
 //     console.log("Boom Pop Bizzle nizzle -----------" + comment.comments);
 //     comment.comments.unshift(commentNew);
 //     post.markModified('comments');
 //     return post.save();
 // }).then((post) =>{
 //     console.log("Step 3 Save post ---------------------------");
 //     console.log(post);
 //     res.redirect('/posts/'+post._id);
 //   }).catch((err)=>{
 //     console.log(err);
 //   });
 // })
 //
 // const findComment = (id, comments) => {
 //   if (comments.length > 0) {
 //     for (var index = 0; index < comments.length; index++) {
 //       const comment = comments[index];
 //       if (comment._id == id) {
 //         console.log(">>> FOUND <<<<");
 //         return comment;
 //       }
 //       const foundComment = findComment(id, comment.comments);
 //       if (foundComment) {
 //         return foundComment;
 //       }
 //     }
 //   }
 // };


};
