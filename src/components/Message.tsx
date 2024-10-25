import { motion } from "framer-motion";
import { Message as MessageType } from "../types/Message";

interface MessageProps {
    message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                    }`}
            >
                {message.text}
            </div>
        </motion.div>
    );
};
