import { motion } from "framer-motion";

export const TypingAnimation = () => (
    <div className="flex space-x-2 p-3 bg-secondary rounded-lg w-16">
        <motion.div
            className="w-2 h-2 bg-secondary-foreground rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
        />
        <motion.div
            className="w-2 h-2 bg-secondary-foreground rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
        />
        <motion.div
            className="w-2 h-2 bg-secondary-foreground rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.4 }}
        />
    </div>
);
