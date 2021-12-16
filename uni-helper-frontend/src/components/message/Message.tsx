import React from 'react';
import type { MessageType } from '../../contexts/MessageContext';
import { tw } from '../../utils';

interface Props {
    variant: MessageType;
    message: string;
}

const VARIANTS: { [key in MessageType]: string } = {
    SUCCESS: tw('bg-green-400'),
    ERROR: tw('bg-red-400'),
};

const Message: React.FC<Props> = ({ variant, message }) => (
    <div className={`p-4 animate-messageFloat pointer-events-none ${VARIANTS[variant]}`}>
        <p>{message}</p>
    </div>
);

export default Message;
