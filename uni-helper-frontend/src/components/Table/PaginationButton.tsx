import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
    icon: IconProp;
    onClick: () => void;
    disabled: boolean;
}

const PaginationButton: React.FC<Props> = ({ icon, onClick, disabled }) => (
    <button className="mx-4 disabled:text-gray-300" type="button" onClick={onClick} disabled={disabled}>
        <FontAwesomeIcon className="text-xl" icon={icon} />
    </button>
);

export default PaginationButton;
