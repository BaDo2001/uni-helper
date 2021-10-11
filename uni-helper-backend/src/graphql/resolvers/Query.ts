import { QueryResolvers } from './../../../generated-typings/graphql-types.d';
import { ApolloError } from 'apollo-server-express';

const QueryResolver: QueryResolvers = {
    getAllUsers: async () => {
        try {
            const mockUsers = [{ name: 'xyz' }, { name: 'abc' }];
            return mockUsers;
        } catch (error) {
            throw new ApolloError(error as string);
        }
    },
};

export default QueryResolver;
