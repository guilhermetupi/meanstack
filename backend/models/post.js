const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: mongoose.SchemaTypes.String, required: true },
  content: { type: mongoose.SchemaTypes.String, required: true },
  imagePath: { type: mongoose.SchemaTypes.String, required: true },
  creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Post', postSchema);
