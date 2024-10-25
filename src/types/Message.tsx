export interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
}

export interface QuerySuggestion {
    icon: React.ReactNode;
    text: string;
}
