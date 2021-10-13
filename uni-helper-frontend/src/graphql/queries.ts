import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_USERS_QUERY = gql`
query {
  getAllUsers {
    name
    age
    email
  }
}
`;
