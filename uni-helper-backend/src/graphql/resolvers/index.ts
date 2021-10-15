import { IResolvers } from './../../../generated-typings/graphql-types.d';
import QueryResolver from './Query';

const resolvers: Required<IResolvers> = {
    Query: QueryResolver,
    User: {},
    Subject: {},
};

export default resolvers;
