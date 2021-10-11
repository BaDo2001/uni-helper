import { Resolvers } from './../../../generated-typings/graphql-types.d';
import QueryResolver from './Query';

const resolvers: Resolvers = {
    Query: QueryResolver,
};

export default resolvers;
