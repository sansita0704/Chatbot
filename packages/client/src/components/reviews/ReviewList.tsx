import { HiSparkles } from 'react-icons/hi2';
import { useMutation, useQuery } from '@tanstack/react-query';
import StarRating from './StarRating';
import { Button } from '../ui/button';
import ReviewSkeleton from './ReviewSkeleton';
import {
    reviewsApi,
    type GetReviewsResponse,
    type SummarizeResponse,
} from './reviewsApi';

type Props = {
    productId: number;
};

const ReviewList = ({ productId }: Props) => {
    const summaryMutation = useMutation<SummarizeResponse>({
        mutationFn: () => reviewsApi.summarizeReviews(productId),
    });

    const reviewsQuery = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => reviewsApi.fetchReviews(productId),
    });

    if (reviewsQuery.isLoading)
        return (
            <div className="flex flex-col gap-5">
                {[1, 2, 3].map((i) => (
                    <ReviewSkeleton key={i} />
                ))}
            </div>
        );

    if (reviewsQuery.isError)
        return (
            <p className="text-red-500">
                Could not fetch the reviews. Try again!
            </p>
        );

    if (!reviewsQuery.data?.reviews.length)
        return <p>No reviews found for this product.</p>;

    const currentSummary =
        reviewsQuery.data.summary || summaryMutation.data?.summary;

    return (
        <div>
            <div className="mb-5">
                {currentSummary ? (
                    <p>{currentSummary}</p>
                ) : (
                    <div>
                        <Button
                            onClick={() => summaryMutation.mutate()}
                            className="rounded-lg cursor-pointer"
                            disabled={summaryMutation.isPending}
                        >
                            <HiSparkles />
                            {summaryMutation.isPending
                                ? 'Summarizing...'
                                : 'Summarize'}
                        </Button>
                        {summaryMutation.isPending && (
                            <div className="py-3">
                                <ReviewSkeleton />
                            </div>
                        )}
                        {summaryMutation.isError && (
                            <p className="text-red-500 mt-2">
                                Could not summarize the reviews. Try again!
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-5">
                {reviewsQuery.data?.reviews.map((review) => (
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
