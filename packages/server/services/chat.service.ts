import { Groq } from 'groq-sdk';
import { conversationRepository } from '../repositories/conversation.repository';

// Implementation detail: do not export it
const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

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
            messages: chatHistory,
            temperature: 0.2,
            max_tokens: 300,
        });

        const message = response.choices[0]?.message.content;

        chatHistory.push({
            role: 'assistant',
            content: message,
        });

        conversationRepository.setChatHistory(conversationId, chatHistory);

        return { id: response.id, message: message || '' };
    },
};
