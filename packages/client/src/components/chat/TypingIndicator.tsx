const TypingIndicator = () => {
    return (
        <div className="flex gap-1 bg-gray-100 p-3 self-start rounded-2xl">
            <Dot />
            <Dot className="[animation-delay:0.2s]" />
            <Dot className="[animation-delay:0.4s]" />
        </div>
    );
};

type DotProps = {
    className?: string; // optional
};

// Implementation detail: do not export it
const Dot = ({ className }: DotProps) => (
    <div
        className={`w-2 h-2 rounded-full bg-gray-800 animate-pulse ${className}`}
    ></div>
);

export default TypingIndicator;
