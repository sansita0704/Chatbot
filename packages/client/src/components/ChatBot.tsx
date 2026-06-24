import { useRef, type KeyboardEvent } from 'react';
import axios from 'axios';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';

type FormData = {
    prompt: string;
};

const ChatBot = () => {
    const conversationId = useRef(crypto.randomUUID());
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    // Destructure the data here only:
    const onSubmit = async ({ prompt }: FormData) => {
        reset();

        const { data } = await axios.post('/api/chat', {
            prompt,
            conversationId: conversationId.current,
        });

        console.log(data);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
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
    );
};

export default ChatBot;
