import React from 'react';
import { v4 as uuid } from 'uuid';
import { useOwnSubjectsQuery } from '../../../../generated-typings/graphql-types';
import { useMessageContext } from '../../../contexts/MessageContext';
import Spinner from '../../Spinner';
import SubjectCard from './SubjectCard';

const DashboardPage: React.FC = () => {
    const { loading, data, error } = useOwnSubjectsQuery();
    const { addMessage } = useMessageContext();

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        addMessage({ id: uuid(), type: 'ERROR', message: error.message });
    }

    if (!data?.Me?.subjects) {
        return <h1>You don&apos;t have any subjects</h1>;
    }

    return (
        <div className="w-full bg-white shadow-2xl flex flex-col py-8 px-20">
            <h1 className="uppercase font-semibold text-blue-500 text-md mb-4">My own subjects</h1>
            {
                data.Me.subjects.map(subject => (
                    // eslint-disable-next-line
                    <div key={subject!._id}>
                        { /* eslint-disable-next-line */ }
                        <SubjectCard subject={subject!} />
                    </div>
                ))
            }
        </div>
    );
};

export default DashboardPage;
