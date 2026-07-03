import { RiRobot2Fill } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-5 justify-center mt-10 h-screen">
            <Button
                onClick={() => navigate('/chatbot')}
                className="font-bold text-lg p-6 cursor-pointer"
                variant={'outline'}
            >
                <RiRobot2Fill size={100} />
                AI ChatBot
            </Button>
            <Button
                onClick={() => navigate('/summarizer')}
                className="font-bold text-lg p-6 cursor-pointer"
                variant={'outline'}
            >
                <HiSparkles />
                Review Summarizer
            </Button>
        </div>
    );
};

export default Home;
