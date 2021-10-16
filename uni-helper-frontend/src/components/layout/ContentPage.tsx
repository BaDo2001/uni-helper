import React, { HTMLProps } from 'react';
import { classNames } from '../../utils';
import Navbar from '../navigation/Navbar';

const ContentPageItemContainer: React.FC<HTMLProps<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <div className={classNames('bg-gray-50 m-4 p-4 rounded-2xl', className)} {...rest}>
        {children}
    </div>
);

const ContentPage: React.FC = ({ children }) => (
    <div className="bg-indigo-300 flex h-screen">
        <ContentPageItemContainer className="mr-0 w-60">
            <Navbar />
        </ContentPageItemContainer>

        <ContentPageItemContainer className="flex-1">
            {children}
        </ContentPageItemContainer>
    </div>
);

export default ContentPage;
