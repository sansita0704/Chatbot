import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';

export const reviewService = {
    async summarizeReviews(productId: number): Promise<string> {
        const existingSummary =
            await reviewRepository.getReviewSummary(productId);
        if (existingSummary) return existingSummary;

        // Get the last 10 reviews
        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews.map((r) => r.content).join('\n\n');

        // Create the prompt
        const prompt = template.replace('{{reviews}}', joinedReviews);

        // Call the AI model and get the summary
        const { text: summary } = await llmClient.generateText({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            maxTokens: 500,
        });

        await reviewRepository.storeReviewSummary(productId, summary);

        return summary;
    },
};
