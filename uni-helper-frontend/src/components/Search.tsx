import type { ChangeEvent } from 'react';
import React from 'react';
import debounce from 'lodash.debounce';

export interface Props {
    setFilter: (filter: string) => void;
}

const SearchBar: React.FC<Props> = ({ setFilter }) => {
    const debouncedSetFilter = debounce((filter: string) => {
        setFilter(filter);
    }, 500);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSetFilter(e.target.value);
    };

    return (
        <label className="block flex-1">
            <input className="block w-full p-4" onChange={onChange} placeholder="Search..." />
        </label>
    );
};

export default SearchBar;
