const Comment = require('../models/comment');
const Post = require('../models/post')
const User = require('../models/user')


module.exports = (app) => {



    // CREATE Comment
	// TODO: find a way to prevent unauthorized users
	// from accessing this ROUTE or variable URL via Middleware
	// akin to checkAuth in server.js
	app.post('/posts/:postId/comments', (req, res) => {
		// INSTANTIATE INSTANCE OF EMBER MODEL
		const comment = new Comment(req.body);
		comment.author = req.user._id;
        comment.postId = req.params.postId
		comment
			// Save instance to DB
			.save()
			// Find the parent Flare
			.then(() => {
				return Post.findById(req.params.postId);

			})
			.then((post) => {
				post.comments.unshift(comment);
				post.save();
			})
			// Find the parent Pyromancer
			.then(() => {
				return User.findById(req.user._id);
			})
			// Find the author, save its posts
			.then((user) => {
				user.comments.unshift(comment);
				user.save();
			})
			// Redirect to original Flare
			.then(() => {
				res.redirect('/posts/' + req.params.postId);
			})
			.catch((err) => {
				console.log(err);
			});
	});











        // app.post("/posts/:postId/comments", (req, res, post) => {
        //     var currentUser = req.user
        //     if (currentUser) {
        //         // Find The parent Post
        //         Post.findById(req.params.postId).exec((err, post) => {
        //             // post.author = req.user._id;
        //             var postId = req.params.postId
        //             console.log("BOOOOOOM -----------" + postId);
        //
        //             // console.log(post.comments._id.author);
        //
        //             //unshift a new comment
        //             let newComment = new Comment(req.body);
        //
        //             newComment.author = currentUser
        //             // newComment.postId = req.params.postId
        //             // newComment.content = req.body.content;
        //             newComment.postId = postId;
        //             // newComment.author = currentUser.username;
        //             newComment.save().then((comment) => {
        //                 post.comments.unshift(comment._id);
        //                 console.log("post" +post);
        //                 console.log("comment" +comment);
        //                 post.save().then(() => {
        //                     //Redirect to parent post
        //                     return res.redirect(`/posts/` + post._id);
        //                 })
        //             })
        //         });
        //     } else {
        //         res.send('401')
        //         console.log("Unauthorized..");
        //
        //     }
        // });


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
