const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

const blogRouter = require('./routes/blogRoutes');

const app = express();
const port = config.port;

// MongoDB connection
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use('/api/posts', blogRouter); // Use routes for fetching posts

app.listen(port, () => {
    console.log(`App running in ${config.environment} mode on port ${port}`);
    console.log('MongoDB URI:', config.mongoURI);
    console.log('Redis Host:', config.redisHost);
});
