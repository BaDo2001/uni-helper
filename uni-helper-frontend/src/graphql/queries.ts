/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';

const USERS_QUERY = gql`
    query User {
        users {
            name
            age
            email
        }
    }
`;

const BSZ2_QUERY = gql`
    query Bsz2 {
        Bsz2 {
            id
            name
            credits
        }
    }
`;
