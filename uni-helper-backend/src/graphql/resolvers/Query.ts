import { QueryResolvers } from './../../../generated-typings/graphql-types.d';
import { ApolloError } from 'apollo-server-express';

const QueryResolver: QueryResolvers = {
    getAllUsers: async () => {
        try {
            const mockUsers = [
                { name: 'John Doe', email: 'john.doe@example.com', age: 27 },
                { name: 'Jane Doe', email: 'jane.doe@example.com', age: 30 },
            ];
            return mockUsers;
        } catch (error) {
            throw new ApolloError(error as string);
        }
    },
};

export default QueryResolver;
