import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

// Create the app
const app = express();
app.use(express.json());
app.use(router);

// Initialize the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
