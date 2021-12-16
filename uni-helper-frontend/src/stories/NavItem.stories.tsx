import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import type { ComponentMeta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ButtonNavItem, LinkNavItem, NavItemContainer } from '../components/navigation/NavItem';

export default {
    title: 'NavItem',
    component: NavItemContainer,
} as ComponentMeta<typeof NavItemContainer>;

export const ButtonItem = () => (
    <div className="w-40">
        <NavItemContainer variant="BUTTON" icon={faHome}>
            { /* eslint-disable-next-line @typescript-eslint/no-empty-function */ }
            <ButtonNavItem title="Test" onClick={() => {}} />
        </NavItemContainer>
    </div>
);

export const LinkItem = () => (
    <div className="w-40">
        <Router>
            <NavItemContainer variant="LINK" icon={faHome}>
                <LinkNavItem title="Test" to="#" />
            </NavItemContainer>
        </Router>
    </div>
);
