import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Define a route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World!',
    });
});

// conversationId -> chatHistory
const conversations = new Map<string, any[]>();

app.post('/api/chat', async (req: Request, res: Response) => {
    // 1. Take user's prompt from the chat
    const { prompt, conversationId } = req.body;

    const chatHistory = conversations.get(conversationId) || [];

    chatHistory.push({
        role: 'user',
        parts: [{ text: prompt }],
    });

    // 2. Send prompt to gemini
    const response = await client.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: chatHistory,
        config: {
            temperature: 0.2,
            maxOutputTokens: 100,
        },
    });

    chatHistory.push({
        role: 'model',
        parts: [{ text: response.text }],
    });

    conversations.set(conversationId, chatHistory);

    // 3. Return the JSON object
    res.json({ message: response.text });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
