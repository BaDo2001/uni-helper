import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import Spinner from '../components/Spinner';

export default {
    title: 'Spinner',
    component: Spinner,
} as ComponentMeta<typeof Spinner>;

export const Main = () => <Spinner />;
