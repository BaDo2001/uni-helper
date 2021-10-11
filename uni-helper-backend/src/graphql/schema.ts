import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import Query from './types/query';
import User from './types/user';

const schemaWithResolvers = makeExecutableSchema({
    typeDefs: [DIRECTIVES, Query, User],
    resolvers: resolvers,
});

export default schemaWithResolvers;
