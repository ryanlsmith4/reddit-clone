const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content : { type: String },
    // author  :  { type: Schema.Types.ObjectId, ref: "User"  },
    // author:  { type: Schema.Types.ObjectId, ref: "User"},
    post    : { type: Schema.Types.ObjectId, ref: "Post"},
    comments: [this],
    // postId:  { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
