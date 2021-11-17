import React from 'react';
import Navbar from '../navigation/Navbar';

const ContentPage: React.FC = ({ children }) => (
    <div className="bg-gray-100 flex flex-col sm:flex-row h-screen">
        <div className="bg-white mr-0 w-full sm:w-60">
            <Navbar />
        </div>

        <div className="flex-1 p-16">
            {children}
        </div>
    </div>
);

export default ContentPage;
