import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { HiSparkles } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';
import StarRating from './StarRating';
import { Button } from '../ui/button';

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

const ReviewList = ({ productId }: Props) => {
    const {
        data: reviewData,
        isLoading,
        error,
    } = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviews(),
    });

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
                    <div key={i}>
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                        <Skeleton count={2} />
                    </div>
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

    return (
        <div>
            <div className="mb-5">
                {reviewData?.summary ? (
                    <p>{reviewData?.summary}</p>
                ) : (
                    <Button>
                        <HiSparkles />
                        Summarize
                    </Button>
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
