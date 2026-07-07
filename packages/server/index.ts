// Load environment variables before any module that reads them at import time
import 'dotenv/config';
import express from 'express';
import router from './routes';

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
