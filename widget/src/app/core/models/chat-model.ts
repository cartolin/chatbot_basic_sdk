export interface ChatMessage{
    from: 'user' | 'bot';
    text : string;
};

export interface ChatQueryResponse {
    answer: string;
}