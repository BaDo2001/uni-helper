import { gql } from 'apollo-server-express';

const Query = gql`
	type Query {
		getAllUsers: [User]
	}
`;

export default Query;
