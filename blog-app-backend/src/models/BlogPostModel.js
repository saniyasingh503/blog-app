const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true},
    content: { type: String, required: true },
    author: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
