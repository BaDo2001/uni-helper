import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import SearchBar from '../components/Search';

export default {
    title: 'Search',
    component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Main = () => <SearchBar setFilter={() => {}} />;
