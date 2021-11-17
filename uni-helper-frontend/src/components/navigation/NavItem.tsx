import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

type NavItemVariant = 'BUTTON' | 'LINK';

// eslint-disable-next-line no-unused-vars
const VARIANT_MAPS: { [key in NavItemVariant]: string } = {
    BUTTON: 'mb-6 text-white bg-blue-500 hover:bg-blue-600',
    LINK: 'last:border-none border-b text-blue-500 bg-white hover:bg-gray-100 ',
};

interface ContainerProps {
    icon: IconProp;
    variant: NavItemVariant;
}

export const NavItemContainer: React.FC<ContainerProps> = ({ icon, variant, children }) => (
    <li className={`mx-2 sm:mx-0 cursor-pointer flex items-center relative ${VARIANT_MAPS[variant]}`}>
        <FontAwesomeIcon className="w-5 absolute left-2 pointer-events-none" icon={icon} fixedWidth />
        {children}
    </li>
);

interface LinkProps {
    to: string;
    title: string;
}

export const LinkNavItem: React.FC<LinkProps> = ({ to, title }) => (
    <Link className="font-medium leading-10 block w-full" to={to}>
        <span className="pl-9">{title}</span>
    </Link>
);

interface ButtonProps {
    title: string;
    onClick: () => void;
    disabled?: boolean | undefined;
}

export const ButtonNavItem: React.FC<ButtonProps> = ({ title, ...props }) => (
    <button type="button" className="font-medium leading-10 block w-full pl-9 text-left" {...props}>
        {title}
    </button>
);
