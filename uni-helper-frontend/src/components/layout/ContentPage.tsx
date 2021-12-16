import React from 'react';
import MessageContainer from '../message/MessageContainer';
import Navbar from '../navigation/Navbar';

const ContentPage: React.FC = ({ children }) => (
    <div className="bg-gray-100 flex flex-col lg:flex-row min-h-screen">
        <div className="bg-white mr-0 w-full lg:w-60">
            <Navbar />
        </div>

        <div className="flex-1 p-4 xl:px-16 xl:py-8 relative min-h-full">
            {children}

            <div className="fixed flex justify-center left-0 lg:left-60 right-0 bottom-8">
                <div className="w-full max-w-xs">
                    <MessageContainer />
                </div>
            </div>
        </div>
    </div>
);

export default ContentPage;
