import Groq from 'groq-sdk';
import type { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs';
import { InferenceClient } from '@huggingface/inference';
import summarizePrompt from './prompts/summarize-reviews.txt';

const openAIClient = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

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
        const response = await openAIClient.chat.completions.create({
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

    async summarizeReviews(reviews: string) {
        const chatCompletion = await inferenceClient.chatCompletion({
            model: 'meta-llama/Llama-3.1-8B-Instruct:novita',
            messages: [
                {
                    role: 'system',
                    content: summarizePrompt,
                },
                {
                    role: 'user',
                    content: reviews,
                },
            ],
        });

        return chatCompletion.choices[0]?.message.content || '';
    },
};
