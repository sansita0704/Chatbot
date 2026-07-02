import ChatBot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';

function App() {
    return (
        <div className="p-4 h-screen w-2xl mx-auto">
            <ReviewList productId={1} />
            <ChatBot />
        </div>
    );
}

export default App;
