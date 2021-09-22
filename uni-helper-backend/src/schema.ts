import { ServiceTypeDefs } from './service/serviceSchema';
import ServiceResolvers from './service/serviceResolver';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const schema = makeExecutableSchema({
    typeDefs: ServiceTypeDefs,
    resolvers: ServiceResolvers,
});
