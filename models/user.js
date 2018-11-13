const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    password: { type: String, select: false },
    username: { type: String, required: true }
});

UserSchema.pre("save", function(next) {
    //SET createdAt && updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next()
});

module.exports = mongoose.model("User", UserSchema);
