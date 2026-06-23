import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import z from 'zod';
import { conversationRepository } from './repositories/conversation.repository';

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

const chatSchema = z.object({
    prompt: z
        .string()
        .trim()
        .min(1, 'Prompt is required.')
        .max(1000, 'Prompt is too long (max 1000 characters)'),
    conversationId: z.string().uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
    // Validate the input data:
    const parseResult = chatSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json(parseResult.error.format());
        return;
    }

    try {
        // 1. Take user's prompt from the chat
        const { prompt, conversationId } = req.body;

        const chatHistory =
            conversationRepository.getChatHistory(conversationId);

        chatHistory.push({
            role: 'user',
            parts: [{ text: prompt }],
        });

        // 2. Send prompt to gemini
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash-lite!',
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

        conversationRepository.setChatHistory(conversationId, chatHistory);

        // 3. Return the JSON object
        res.json({ message: response.text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate a response.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
