import { Phone, CreditCard, HelpCircle, FileQuestion, Package, Mail } from 'lucide-react';
import { QuerySuggestion } from '../types/Message';

export const querySuggestions: QuerySuggestion[] = [
    { icon: <Phone className="w-4 h-4" />, text: "How can I contact support?" },
    { icon: <CreditCard className="w-4 h-4" />, text: "What payment methods do you accept?" },
    { icon: <Package className="w-4 h-4" />, text: "Track my order" },
    { icon: <HelpCircle className="w-4 h-4" />, text: "Common FAQ" },
    { icon: <FileQuestion className="w-4 h-4" />, text: "Return policy" },
    { icon: <Mail className="w-4 h-4" />, text: "Subscribe to newsletter" },
];

export const getBotResponse = (text: string): string => {
    switch (text) {
        case "How can I contact support?":
            return "You can reach our support team 24/7 at support@example.com or call us at 1-800-SUPPORT.";
        case "What payment methods do you accept?":
            return "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.";
        case "Track my order":
            return "Please enter your order number to track your shipment. You can find this in your confirmation email.";
        case "Common FAQ":
            return "Check out our FAQ section at example.com/faq for answers to common questions about orders, returns, and account management.";
        case "Return policy":
            return "We offer a 30-day return policy on all unused items. Please keep the original packaging for returns.";
        case "Subscribe to newsletter":
            return "Enter your email to subscribe to our newsletter and get 10% off your first purchase!";
        default:
            return "I'll help you with that query.";
    }
};
