const mongoose = require('mongoose');
const Post = require('./models/BlogPostModel'); 
const config = require('./config/config');

const samplePosts = [
    {
        title: 'Understanding Docker for Beginners',
        subtitle: 'A comprehensive guide to containerization',
        content:
            'Docker simplifies the process of application deployment by packaging your application along with its dependencies into a container. This post covers the basics of Docker, its benefits, and how to get started.',
        author: 'Jane Doe',
    },
    {
        title: 'Mastering MongoDB',
        subtitle: 'Tips and tricks for efficient database management',
        content:
            'MongoDB is a powerful NoSQL database, but to get the most out of it, you need to follow best practices. This post explores schema design, indexing, and query optimization.',
        author: 'John Smith',
    },
    {
        title: 'Caching with Redis',
        subtitle: 'How Redis can supercharge your applications',
        content:
            'Redis is an in-memory key-value store that can act as a cache to speed up your application. Learn how to integrate Redis into your tech stack and use it effectively.',
        author: 'Alice Johnson',
    },
    {
        title: 'Building RESTful APIs with Node.js',
        subtitle: 'Step-by-step guide for creating scalable APIs',
        content:
            'Node.js is an excellent choice for building RESTful APIs due to its asynchronous nature and robust ecosystem. This post walks you through creating a CRUD API using Express.',
        author: 'Bob Williams',
    },
    {
        title: 'Deploying Applications with Docker Compose',
        subtitle: 'Simplify multi-container setups with Docker Compose',
        content:
            'Docker Compose makes managing multi-container applications a breeze. This post demonstrates how to use Docker Compose to deploy a Node.js app with MongoDB and Redis.',
        author: 'Sarah Taylor',
    },
];


async function seedDatabase() {
    if (config.nodeEnv === 'production') {
        console.log('Seeding skipped in production environment.');
        return;
    }

    try {
        const existingPosts = await Post.countDocuments();
        if (existingPosts === 0) {
            // Insert sample posts
            await Post.insertMany(samplePosts);
            console.log('Sample posts added to the database!');
        } else {
            console.log('Database already contains posts. No seeding needed.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

module.exports = seedDatabase;
