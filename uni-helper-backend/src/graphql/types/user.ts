import { gql } from 'apollo-server-express';

const User = gql`
	type User @entity {
		id: String @id
		name: String! @column
		email: String! @column
		age: Int! @column
		country: String @column
	}
`;

export default User;
