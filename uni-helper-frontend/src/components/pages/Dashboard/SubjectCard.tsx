import React from 'react';
import type { IOwnSubjectFragment } from '../../../../generated-typings/graphql-types';

export interface Props {
    subject: IOwnSubjectFragment;
}

const SubjectCard: React.FC<Props> = ({ subject }) => (
    <div className="border mb-4 border-blue-500 p-6 flex shadow-inner">
        <h1 className="flex-1">{subject.name}</h1>

        <p>
            {subject.credits}
            {' '}
            credit
            {subject.credits === 1 ? '' : 's' }
        </p>
    </div>
);

export default SubjectCard;
