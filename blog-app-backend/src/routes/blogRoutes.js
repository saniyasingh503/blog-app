const express = require('express');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/blogController');
const router = express.Router();

/**
 * Routes for Blog Post CRUD operations.
 */

// Route for fetching all posts
router.get('/', getAllPosts);

// Route for fetching a single post by ID
router.get('/:id', getPostById);

// Route for creating a new post
router.post('/', createPost);

// Route for updating a post
router.put('/:id', updatePost);

// Route for deleting a post
router.delete('/:id', deletePost);

module.exports = router;
