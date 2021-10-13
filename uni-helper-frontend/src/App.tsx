import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USERS_QUERY } from './graphql/queries';

type User = {
    name: string;
    email: string;
    age: number;
};

type Query = {
    getAllUsers: User[];
};

const App = () => {
    const { data, loading, error } = useQuery<Query>(GET_USERS_QUERY);

    if (loading) {
        return <div>loading</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (data) {
        return (
            <div>
                <ul className="w-full">
                    <li className="flex">
                        <div className="flex-1 text-center font-bold text-lg py-4 bg-gray-400 border-2 border-black">Name</div>
                        <div className="flex-1 text-center font-bold text-lg py-4 bg-gray-400 border-2 border-black">Age</div>
                        <div className="flex-1 text-center font-bold text-lg py-4 bg-gray-400 border-2 border-black">Email</div>
                    </li>
                    {data?.getAllUsers.map(({ name, age, email }) => (
                        <li className="flex" key={name}>
                            <div className="flex-1 text-center py-4 bg-gray-100 border border-black">{name}</div>
                            <div className="flex-1 text-center py-4 bg-gray-100 border border-black">{age}</div>
                            <div className="flex-1 text-center py-4 bg-gray-100 border border-black">{email}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return <h1>No data</h1>;
};

export default App;
