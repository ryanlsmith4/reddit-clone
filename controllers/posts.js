// export functions to server.js
//Controller handling post POST request w/the server
const Post = require('../models/post');


module.exports = app => {
    //Create new DB object Called POST
    app.post("/posts/new", (req, res) => {
        // Instance of POST model
        const post = new Post(req.body);
        // Save the model in DB
        post.save((err, post) => {
            // redirect
            return res.redirect(`/`);
        })
        console.log(req.body);
    });
};
