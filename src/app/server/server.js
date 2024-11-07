const express = require('express');
const { MongoClient } = require('mongodb'); // Import MongoClient from mongodb package
const app = express();
const searchRouter = require('./routes/searchRoutes'); // Import the router


// Initialize MongoDB client with the URI

async function main() {
    try {
        app.use(express.json()); // For parsing JSON request bodies

        // Connect to MongoDB
        const client = new MongoClient("mongodb+srv://lichengtx:iloveratemytutor@users.y0ul8.mongodb.net/?retryWrites=true&w=majority&appName=users");
        await client.connect();
        console.log('Connected to MongoDB');

        // Attach the client to app.locals for use in controllers
        app.locals.client = client;

        // Use the router for routes
        app.use('/api/search', searchRouter);

        // Start the server
        const PORT = 2000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });


    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit if connection fails
    }
}

// Run the main function to start the server and connect to MongoDB
main();

