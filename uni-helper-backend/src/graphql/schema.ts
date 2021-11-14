import { SchemaComposer } from 'graphql-compose';
import type { GraphQLSchema } from 'graphql';
import type { AuthInfo } from '../middleware/auth';
import { SubjectTC } from '../db/models/Subject';
import { UserTC } from '../db/models/User';
import { authMiddlewareGraphQL } from './middleware/Auth';

export interface Context {
    user?: AuthInfo;
}

const createGraphQLSchema = (): GraphQLSchema => {
    const schemaComposer = new SchemaComposer<Context>();

    schemaComposer.Query.addFields({
        Me: UserTC.getResolver('me').withMiddlewares([authMiddlewareGraphQL('USER')]),
        SubjectMany: SubjectTC.mongooseResolvers.findMany(),
        SubjectPagination: SubjectTC.mongooseResolvers.pagination(),
    });

    schemaComposer.Mutation.addFields({
        SubjectCreateOne: SubjectTC.mongooseResolvers.createOne().withMiddlewares([authMiddlewareGraphQL('ADMIN')]),
        SubjectUpdateById: SubjectTC.mongooseResolvers.updateById().withMiddlewares([authMiddlewareGraphQL('ADMIN')]),
        SubjectRemoveById: SubjectTC.mongooseResolvers.removeById().withMiddlewares([authMiddlewareGraphQL('ADMIN')]),
        UserLogin: UserTC.getResolver('login'),
    });

    return schemaComposer.buildSchema();
};

export default createGraphQLSchema();
