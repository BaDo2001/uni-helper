import React, { createContext, useContext, useState } from 'react';

export type MessageType = 'ERROR' | 'SUCCESS';

export interface Message {
    id: string;
    type: MessageType;
    message: string;
}

const useMessageContextValue = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const removeMessage = (messageId: string) => {
        setMessages(messages.filter(message => message.id !== messageId));
    };

    const addMessage = (newMessage: Message) => {
        setMessages([
            ...messages,
            newMessage,
        ]);

        setTimeout(() => {
            removeMessage(newMessage.id);
        }, 3000);
    };

    return {
        messages,
        addMessage,
    };
};

const MessageContext = createContext({} as ReturnType<typeof useMessageContextValue>);

export const useMessageContext = () => useContext(MessageContext);

const MessageProvider: React.FC = ({ children }) => (
    <MessageContext.Provider value={useMessageContextValue()}>{children}</MessageContext.Provider>
);

export default MessageProvider;
