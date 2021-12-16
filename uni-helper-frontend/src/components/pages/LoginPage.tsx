import React from 'react';
import image1 from '../../assets/login_image1.jpg';
import image2 from '../../assets/login_image2.jpg';
import image3 from '../../assets/login_image3.jpg';

const LoginPage: React.FC = () => (
    <>
        <h1 className="text-center font-bold text-xl text-blue-500">Welcome to Uni Helper!</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12">
            <p className="flex-1 mr-4 mb-4 sm:mb-0 text-center">
                A website to manage your university tasks
            </p>
            <div className="flex-1 ml-4">
                <img className="w-full shadow-2xl rounded-3xl" src={image1} alt="university building" />
            </div>
        </div>
        <div className="flex flex-col sm:flex-row-reverse justify-between items-center mt-12">
            <p className="flex-1 ml-4 mb-4 sm:mb-0 text-center">
                From a student to all students
            </p>
            <div className="flex-1 mr-4">
                <img className="w-full shadow-2xl rounded-3xl" src={image2} alt="university students" />
            </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12">
            <p className="flex-1 mr-4 mb-4 sm:mb-0 text-center">
                Never miss a deadline again
            </p>
            <div className="flex-1 ml-4">
                <img className="w-full shadow-2xl rounded-3xl" src={image3} alt="scheduler notebook" />
            </div>
        </div>
    </>
);

export default LoginPage;
