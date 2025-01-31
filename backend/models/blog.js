const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const BlogSchema = new Schema({
    blogCreatedOn: String,
    blogEditedOn: String,
    blogTitle: String,
    blogAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blogCoverImage: String,
    blogContent: String,
});

module.exports = mongoose.model("Blog", BlogSchema);