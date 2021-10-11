import { gql } from 'apollo-server-express';

const User = gql`
	type User @entity {
		id: String @id
		name: String! @column
		email: Float @column
		age: Int @column
	}
`;

export default User;
