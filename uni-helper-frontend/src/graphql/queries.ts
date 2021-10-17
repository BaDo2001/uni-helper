/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';

const SUBJECTS_QUERY = gql`
    query Subjects {
        SubjectMany {
            _id
            name
            credits
        }
    }
`;
