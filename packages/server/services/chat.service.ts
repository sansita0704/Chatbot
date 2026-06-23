import { GoogleGenAI } from '@google/genai';
import { conversationRepository } from '../repositories/conversation.repository';

// Implementation detail: do not export it
const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

type ChatResponse = {
    id: string | undefined;
    message: string | undefined;
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

        return { id: response.responseId, message: response.text };
    },
};
