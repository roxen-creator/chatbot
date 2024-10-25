import { useState, useEffect, useRef } from "react"
import { Message as MessageType } from "../types/Message"
import { v4 as uuidv4 } from "uuid"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, Send, X } from "lucide-react"
import { Message } from './Message';
import { TypingAnimation } from './TypingAnimation';
import { querySuggestions, getBotResponse } from '../utils/querySugesstion';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"

export default function Chat() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const simulateTyping = async (response: string) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsTyping(false);

        const botMessage: MessageType = {
            id: uuidv4(),
            sender: "bot",
            text: response,
        };

        setMessages(prev => [...prev, botMessage]);
    };

    const handleSendMessage = (text: string) => {
        const userMessage: MessageType = {
            id: uuidv4(),
            sender: "user",
            text,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");

        const response = getBotResponse(text);
        simulateTyping(response);
    };

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-8 right-8">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="w-80 sm:w-96 bg-background rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
                            <h2 className="text-lg font-semibold">Phul Kumari</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleChat}
                                className="text-primary-foreground hover:text-primary-foreground/80"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
                            {messages.length === 0 && (
                                <div className="space-y-2 mb-4">
                                    <p className="text-sm text-muted-foreground">
                                        Hello! How can I help you today? Please select a query below or type your question.
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {querySuggestions.map((query, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                className="flex items-center gap-2 text-sm"
                                                onClick={() => handleSendMessage(query.text)}
                                            >
                                                {query.icon}
                                                <span className="truncate">{query.text}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <Message key={message.id} message={message} />
                                ))}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <TypingAnimation />
                                    </motion.div>
                                )}
                            </div>
                        </ScrollArea>

                        <div className="p-4 border-t">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (inputValue.trim()) handleSendMessage(inputValue);
                                }}
                                className="flex space-x-2"
                            >
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-grow"
                                />
                                <Button type="submit" size="icon">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <Button
                    onClick={toggleChat}
                    size="icon"
                    className="rounded-full h-12 w-12 shadow-lg"
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}
        </div>
    );
}
