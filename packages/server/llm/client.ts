import Groq from 'groq-sdk';
import type { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs';
import { InferenceClient } from '@huggingface/inference';

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

    async summarize(text: string) {
        const output = await inferenceClient.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: text,
            provider: 'hf-inference',
        });

        return output.summary_text;
    },
};
