import { gql } from 'apollo-server-express';

const User = gql`
	type User @entity {
		id: String @id
		name: String! @column
		email: String! @column
		age: Int! @column
		country: String @column
	}

	type Subject @entity {
		id: String @id
		name: String! @column
		credits: Int! @column
	}
`;

export default User;
