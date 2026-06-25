import { useRef, useState, type KeyboardEvent } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';

type FormData = {
    prompt: string;
};

type ChatResponse = {
    message: string;
};

type Message = {
    content: string;
    role: 'user' | 'bot';
};

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const conversationId = useRef(crypto.randomUUID());
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    // Destructure the data here only:
    const onSubmit = async ({ prompt }: FormData) => {
        setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
        setIsBotTyping(true);

        reset();

        const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
        });

        setMessages((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
        ]);
        setIsBotTyping(false);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-2 mx-2 my-5">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`px-3 py-1 rounded-xl ${
                            message.role === 'user'
                                ? 'bg-blue-600 text-white self-end'
                                : 'bg-gray-100 text-black self-start'
                        }`}
                    >
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                ))}
                {isBotTyping && (
                    <div className="flex gap-1 bg-gray-100 p-3 self-start rounded-2xl">
                        <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                )}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                className="flex flex-col gap-2 items-end border-2 p-4 m-2 rounded-2xl"
            >
                <textarea
                    {...register('prompt', {
                        required: true,
                        validate: (data) => data.trim().length > 0,
                    })}
                    className="w-full border-0 outline-0 resize-none text-sm"
                    placeholder="Ask anything"
                    maxLength={1000}
                ></textarea>
                <Button
                    disabled={!formState.isValid}
                    className="cursor-pointer rounded-full w-9 h-9"
                >
                    <FaArrowUp />
                </Button>
            </form>
        </div>
    );
};

export default ChatBot;
