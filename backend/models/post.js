const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: mongoose.SchemaTypes.String, required: true },
  content: { type: mongoose.SchemaTypes.String, required: true },
  imagePath: { type: mongoose.SchemaTypes.String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
