import React from 'react';
import { useMessageContext } from '../../contexts/MessageContext';
import Message from './Message';

const MessageContainer = () => {
    const { messages } = useMessageContext();
    return (
        <>
            {
                messages.map(message => (
                    <div key={message.id}>
                        <Message variant={message.type} message={message.message} />
                    </div>
                ))
            }
        </>
    );
};

export default MessageContainer;
