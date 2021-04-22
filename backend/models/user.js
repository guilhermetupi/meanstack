const mongoose = require('mongoose');
const uv = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
});

userSchema.plugin(uv);

module.exports = mongoose.model('User', userSchema);
