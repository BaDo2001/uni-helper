import React, { useEffect } from 'react';
import type { ComponentMeta } from '@storybook/react';
import MessageContainer from '../components/message/MessageContainer';
import MessageProvider, { useMessageContext } from '../contexts/MessageContext';

export default {
    title: 'MessageContainer',
    component: MessageContainer,
    decorators: [
        Story => (
            <MessageProvider>
                <Story />
            </MessageProvider>
        ),
    ],
} as ComponentMeta<typeof MessageContainer>;

export const Main = () => {
    const { addMessage } = useMessageContext();

    function mock() {
        addMessage({
            id: Date.now().toString(),
            type: 'SUCCESS',
            message: 'Test message',
        });
    }

    useEffect(() => {
        mock();

        setInterval(() => {
            mock();
        }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <div className="">
            <MessageContainer />
        </div>

    );
};
