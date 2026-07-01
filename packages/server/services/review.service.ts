import type { Review } from '@prisma/client';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';

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
        const response = await llmClient.generateText({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            maxTokens: 500,
        });

        return response.text;
    },
};
