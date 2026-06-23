// Implementation detail
const conversations = new Map<string, any[]>();

export const conversationRepository = {
    getChatHistory(conversationId: string) {
        return conversations.get(conversationId) || [];
    },
    setChatHistory(conversationId: string, chatHistory: any[]) {
        conversations.set(conversationId, chatHistory);
    },
};
