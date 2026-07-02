import axios from 'axios';
import { useEffect, useState } from 'react';

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
    const [reviewData, setReviewData] = useState<GetReviewsResponse>();

    const fetchReviews = async () => {
        const { data } = await axios.get<GetReviewsResponse>(
            `/api/products/${productId}/reviews`
        );

        setReviewData(data);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            {reviewData?.reviews.map((review) => (
                <div key={review.id}>
                    <div className="font-bold">{review.author}</div>
                    <div>Rating: {review.rating}/5</div>
                    <div className="py-2">{review.content}</div>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
