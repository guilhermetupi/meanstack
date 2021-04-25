const express = require('express');
const { getPosts, getPost, postPost, deletePost, editPost } = require('../controllers/post');

const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const exctractFile = require('../middleware/file');

router.get('', getPosts);

router.get("/:id", getPost);

router.post('', checkAuth, exctractFile, postPost);

router.delete('/:id', checkAuth, deletePost);

router.put('/:id', checkAuth, exctractFile, editPost);

module.exports = router;
