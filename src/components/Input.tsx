import { useState } from "react";

interface InputProps {
    onSendMessage: (message: string) => void;
}

const Input = ({ onSendMessage }: InputProps) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(text);
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border-2 border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-blue-500"
                placeholder="Type a message..."
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
            >
                Send
            </button>
        </form>
    );
};

export default Input;
