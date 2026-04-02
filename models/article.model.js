const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    content: {
         type: String,
        required: true,
        minLength: 5,
    },
    author: {
        type: String,
        default: "Guest"
    },

    category: {
        type: String,
        default: "General",
    },

    readTime: {
    type: Number,
    default: 5
},

status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
}




},
{timestamps: true}
);
// Creating a text index on title and content

articleSchema.index({ title: "text", content: "text"});

const Article = mongoose.model("Article", articleSchema)

module.exports = Article;