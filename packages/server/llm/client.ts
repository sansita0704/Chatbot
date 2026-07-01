import Groq from 'groq-sdk';
import type { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs';

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

type GenerateTextOptions = {
    model?: string;
    messages: ChatCompletionMessageParam[];
    temperature?: number;
    maxTokens?: number;
};

type GenerateTextResult = {
    id: string;
    text: string;
};

export const llmClient = {
    async generateText({
        model = 'llama-3.1-8b-instant',
        messages,
        temperature = 0.2,
        maxTokens = 300,
    }: GenerateTextOptions): Promise<GenerateTextResult> {
        const response = await client.chat.completions.create({
            model,
            messages,
            temperature,
            max_completion_tokens: maxTokens,
        });

        return {
            id: response.id,
            text: response.choices[0]?.message.content || '',
        };
    },
};
