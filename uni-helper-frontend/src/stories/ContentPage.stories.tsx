import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ContentPage from '../components/layout/ContentPage';

export default {
    title: 'ContentPage',
    component: ContentPage,
} as ComponentMeta<typeof ContentPage>;

export const Main = () => (
    <Router>
        <ContentPage>
            <h1>Content</h1>
        </ContentPage>
    </Router>
);
