import type { Review } from '@prisma/client';
import { reviewRepository } from '../repositories/review.respository';
import Groq from 'groq-sdk';

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const reviewService = {
    async getReviews(productId: number): Promise<Review[]> {
        return reviewRepository.getReviews(productId);
    },

    async summarizeReviews(productId: number): Promise<string> {
        // Get the last 10 reviews
        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews.map((r) => r.content).join('\n\n');

        // Create the prompt
        const prompt = `
            Summarize the following customer reviews into a short paragraph highlighting key themes, both positive and negative:

            ${joinedReviews}
        `;

        // Call the AI model and get the summary
        const response = await client.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.2,
            max_tokens: 500,
        });

        return response.choices[0]?.message.content || '';
    },
};
