const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content : { type: String },
    author  :  { type: String },
    post    : { type: Schema.Types.ObjectId, ref: "Post"  },
    comments: [{ type: Schema.Types.ObjectId,  ref: "Comment" }]
});

module.exports = mongoose.model("Comment", CommentSchema);
