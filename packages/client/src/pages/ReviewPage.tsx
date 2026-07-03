import ReviewList from '@/components/reviews/ReviewList';

const ReviewPage = () => {
    return (
        <div className="p-5">
            <ReviewList productId={4} />
        </div>
    );
};

export default ReviewPage;
