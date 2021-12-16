import React, { useEffect, useRef } from 'react';

export interface Props {
    show: boolean;
    onClose: () => void;
    initiator: HTMLButtonElement | null;
}

const Popup: React.FC<Props> = ({ show, onClose, initiator, children }) => {
    const popup = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (!initiator?.contains(e.target as Node) && !popup.current?.contains(e.target as Node)) {
                onClose();
            }
        };

        if (show) {
            document.addEventListener('mouseup', listener);

            return () => {
                document.removeEventListener('mouseup', listener);
            };
        }

        document.removeEventListener('mouseup', listener);
    }, [onClose, show, initiator]);
    return show ? (
        <div ref={popup} className="absolute z-10 bg-white shadow-lg">
            {children}
        </div>
    ) : null;
};

export default Popup;
