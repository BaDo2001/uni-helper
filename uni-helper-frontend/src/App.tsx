import React from 'react';
import { useUserQuery } from '../generated-typings/graphql-types.d';

const App = () => {
    const { data, error, loading } = useUserQuery();

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
                    {data.users.map((user) => (
                        <li className="flex" key={user.name}>
                            <div className="flex-1 text-center py-4 bg-gray-100 border border-black">{user.name}</div>
                            <div className="flex-1 text-center py-4 bg-gray-100 border border-black">{user.age}</div>
                            <div className="flex-1 text-center py-4 bg-gray-100 border border-black">{user.email}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return <h1>No data</h1>;
};

export default App;
