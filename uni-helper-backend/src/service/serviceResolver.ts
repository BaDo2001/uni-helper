import { ApolloError } from 'apollo-server-express';

const ServiceResolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                const mockUsers = [{ name: 'xyz' }, { name: 'abc' }];
                return mockUsers;
            } catch (error) {
                throw new ApolloError(error as string);
            }
        },
    },
};

export default ServiceResolvers;