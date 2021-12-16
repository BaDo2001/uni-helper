import React from 'react';
import spinner from '../assets/spinner.gif';

const Spinner = () => (
    <div className="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4">
        <img src={spinner} className="w-10 h-10" alt="Loading..." />
    </div>
);

export default Spinner;
