import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';

export default {
    title: 'Navbar',
    component: Navbar,
} as ComponentMeta<typeof Navbar>;

export const Main = () => (
    <Router>
        <Navbar />
    </Router>
);
