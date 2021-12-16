import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import Message from '../components/message/Message';

export default {
    title: 'Message',
    component: Message,
} as ComponentMeta<typeof Message>;

export const Success = () => (
    <Message message="Test message" variant="SUCCESS" />
);

export const Error = () => (
    <Message message="Test message" variant="ERROR" />
);
