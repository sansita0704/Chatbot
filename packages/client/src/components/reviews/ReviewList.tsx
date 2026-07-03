import axios from 'axios';
import { HiSparkles } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';
import StarRating from './StarRating';
import { Button } from '../ui/button';
import { useState } from 'react';
import ReviewSkeleton from './ReviewSkeleton';

type Props = {
    productId: number;
};

type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
};

type GetReviewsResponse = {
    summary: string | null;
    reviews: Review[];
};

type SummarizeResponse = {
    summary: string | null;
};

const ReviewList = ({ productId }: Props) => {
    const [summary, setSummary] = useState('');
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState('');

    const {
        data: reviewData,
        isLoading,
        error,
    } = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviews(),
    });

    const handleSummarize = async () => {
        try {
            setIsSummaryLoading(true);
            setSummaryError('');

            const { data } = await axios.post<SummarizeResponse>(
                `/api/products/${productId}/reviews/summarize`
            );

            setSummary(data.summary || '');
        } catch (error) {
            console.error(error);
            setSummaryError('Could not summarize the reviews. Try again!');
        } finally {
            setIsSummaryLoading(false);
        }
    };

    const fetchReviews = async () => {
        const { data } = await axios.get<GetReviewsResponse>(
            `/api/products/${productId}/reviews`
        );
        return data;
    };

    if (isLoading)
        return (
            <div className="flex flex-col gap-5">
                {[1, 2, 3].map((i) => (
                    <ReviewSkeleton key={i} />
                ))}
            </div>
        );

    if (error)
        return (
            <p className="text-red-500">
                Could not fetch the reviews. Try again!
            </p>
        );

    if (!reviewData?.reviews.length)
        return <p>No reviews found for this product.</p>;

    const currentSummary = reviewData.summary || summary;

    return (
        <div>
            <div className="mb-5">
                {currentSummary ? (
                    <p>{currentSummary}</p>
                ) : (
                    <div>
                        <Button
                            onClick={handleSummarize}
                            className="rounded-lg cursor-pointer"
                            disabled={isSummaryLoading}
                        >
                            <HiSparkles />
                            {isSummaryLoading ? 'Summarizing...' : 'Summarize'}
                        </Button>
                        {isSummaryLoading && (
                            <div className="py-3">
                                <ReviewSkeleton />
                            </div>
                        )}
                        {summaryError && (
                            <p className="text-red-500 mt-2">{summaryError}</p>
                        )}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-5">
                {reviewData?.reviews.map((review) => (
                    <div key={review.id}>
                        <div className="font-bold">{review.author}</div>
                        <div>
                            <StarRating value={review.rating} />
                        </div>
                        <div className="py-2">{review.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
