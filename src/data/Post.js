// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  datetime: { type: String, required: true },
  body: { type: String, required: true },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
