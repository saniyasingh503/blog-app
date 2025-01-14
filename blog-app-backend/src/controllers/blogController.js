const BlogPost = require('../models/BlogPostModel');
const { redisGet, redisSet, redisDel } = require('../config/redisConfig');  // Redis client

/**
 * Controller for fetching all blog posts.
 * Retrieves all blog posts from the database and returns them as a JSON response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
const getAllPosts = async (req, res, next) => {
    try {
        // Fetch all posts from the database
        console.log('Fetching data from database');
        const posts = await BlogPost.find();

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Controller for fetching a single blog post by ID.
 * First checks the cache for the post data. If not found, retrieves it from the database,
 * caches it in Redis, and returns it as a JSON response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
const getPostById = async (req, res, next) => {
    const { id } = req.params;
    const cacheKey = `post_${id}`;

    try {
        // Check if the post is available in Redis cache
        const cachedPost = await redisGet(cacheKey);
        if (cachedPost) {
            // Return the cached post if found
            console.log('Returning data from cache');
            return res.status(200).json(JSON.parse(cachedPost));
        }

        // If cache miss, fetch the post from the database
        console.log('Fetching data from database');
        const post = await BlogPost.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Cache the post in Redis with an expiration time of 1 hour (3600 seconds)
        redisSet(cacheKey, JSON.stringify(post), 'EX', 3600); 

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Controller for creating a new blog post.
 * Accepts title, subtitle, content, and author from the request body,
 * saves the new post to the database, and caches the newly created post.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
const createPost = async (req, res, next) => {
    const { title, subtitle, content, author } = req.body;

    try {
        // Create a new blog post object using the data from the request body
        const newPost = new BlogPost({ title, subtitle, content, author });
        await newPost.save();

        // Cache the newly created post with its ID as the key
        redisSet(`post_${newPost._id}`, JSON.stringify(newPost), 'EX', 3600); // Cache for 1 hour

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Controller for updating an existing blog post.
 * Updates the title, subtitle, content, and author of the specified post by ID,
 * and updates the cache with the new data.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
const updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, subtitle, content, author } = req.body;

    try {
        // Update the post in the database
        const updatedPost = await BlogPost.findByIdAndUpdate(id, { title, subtitle, content, author }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Update the cache with the new post data
        redisSet(`post_${id}`, JSON.stringify(updatedPost), 'EX', 3600); // Cache for 1 hour

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Controller for deleting a blog post.
 * Deletes the specified post by ID from the database and invalidates the cache.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
const deletePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Delete the post from the database
        const deletedPost = await BlogPost.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Invalidate the cache after deleting the post
        redisDel(`post_${id}`);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
