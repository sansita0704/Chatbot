import fs from 'fs';
import path from 'path';
import { Groq } from 'groq-sdk';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';

// Implementation detail: do not export it
const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const parkInfo = fs.readFileSync(
    path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
    'utf-8'
);

const instructions = template.replace('{{parkInfo}}', parkInfo);
const systemMessage = {
    role: 'system',
    content: instructions,
};

type ChatResponse = {
    id: string | undefined;
    message: string;
};

export const chatService = {
    async sendMessage(
        prompt: string,
        conversationId: string
    ): Promise<ChatResponse> {
        const chatHistory =
            conversationRepository.getChatHistory(conversationId);

        chatHistory.push({
            role: 'user',
            content: prompt,
        });

        // 2. Send prompt to gemini
        const response = await client.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [systemMessage, ...chatHistory],
            temperature: 0.2,
            max_tokens: 300,
        });

        const message = response.choices[0]?.message.content || '';

        chatHistory.push({
            role: 'assistant',
            content: message,
        });

        conversationRepository.setChatHistory(conversationId, chatHistory);

        return { id: response.id, message: message || '' };
    },
};
