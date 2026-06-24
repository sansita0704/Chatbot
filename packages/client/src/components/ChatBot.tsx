import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';

const ChatBot = () => {
    return (
        <div className="flex flex-col gap-2 items-end border-2 p-4 m-2 rounded-2xl">
            <textarea
                className="w-full border-0 outline-0 resize-none text-sm"
                placeholder="Ask anything"
                maxLength={1000}
            ></textarea>
            <Button className="cursor-pointer rounded-full w-9 h-9">
                <FaArrowUp />
            </Button>
        </div>
    );
};

export default ChatBot;
