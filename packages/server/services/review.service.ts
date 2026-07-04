import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';

export const reviewService = {
    async summarizeReviews(productId: number): Promise<string> {
        const existingSummary =
            await reviewRepository.getReviewSummary(productId);
        if (existingSummary) return existingSummary;

        // Get the last 10 reviews
        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews.map((r) => r.content).join('\n\n');

        // Call the AI model and get the summary
        const summary = await llmClient.summarizeReviews(joinedReviews);

        await reviewRepository.storeReviewSummary(productId, summary);

        return summary;
    },
};
