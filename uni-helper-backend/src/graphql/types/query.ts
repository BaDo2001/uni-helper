import { gql } from 'apollo-server-express';

const Query = gql`
	type Query {
		users: [User!]!
		Bsz2: Subject!
	}
`;

export default Query;
