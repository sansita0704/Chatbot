import fs from 'fs';
import path from 'path';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client';

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

        const response = await llmClient.generateText({
            messages: [systemMessage, ...chatHistory],
        });

        chatHistory.push({
            role: 'assistant',
            content: response.text,
        });

        conversationRepository.setChatHistory(conversationId, chatHistory);

        return { id: response.id, message: response.text || '' };
    },
};
