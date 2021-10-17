import { SubjectTC } from '../db/models/Subject';
import { UniversityTC } from '../db/models/University';
import { SchemaComposer } from 'graphql-compose';
import { ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose';
import { GraphQLSchema } from 'graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createGraphQLSchema = (models: ObjectTypeComposerWithMongooseResolvers<any, any>[]): GraphQLSchema => {
    const schemaComposer = new SchemaComposer();

    for (const model of models) {
        const name = model.getTypeName();

        const queries = {
            [`${name}ById`]: model.mongooseResolvers.findById(),
            [`${name}ByIds`]: model.mongooseResolvers.findByIds(),
            [`${name}One`]: model.mongooseResolvers.findOne(),
            [`${name}Many`]: model.mongooseResolvers.findMany(),
            [`${name}DataLoader`]: model.mongooseResolvers.dataLoader(),
            [`${name}DataLoaderMany`]: model.mongooseResolvers.dataLoaderMany(),
            [`${name}ByIdLean`]: model.mongooseResolvers.findById({ lean: true }),
            [`${name}ByIdsLean`]: model.mongooseResolvers.findByIds({ lean: true }),
            [`${name}OneLean`]: model.mongooseResolvers.findOne({ lean: true }),
            [`${name}ManyLean`]: model.mongooseResolvers.findMany({ lean: true }),
            [`${name}DataLoaderLean`]: model.mongooseResolvers.dataLoader({ lean: true }),
            [`${name}DataLoaderManyLean`]: model.mongooseResolvers.dataLoaderMany({ lean: true }),
            [`${name}Count`]: model.mongooseResolvers.count(),
            [`${name}Connection`]: model.mongooseResolvers.connection(),
            [`${name}Pagination`]: model.mongooseResolvers.pagination(),
        };
        
        const mutations = {
            [`${name}CreateOne`]: model.mongooseResolvers.createOne(),
            [`${name}CreateMany`]: model.mongooseResolvers.createMany(),
            [`${name}UpdateById`]: model.mongooseResolvers.updateById(),
            [`${name}UpdateOne`]: model.mongooseResolvers.updateOne(),
            [`${name}UpdateMany`]: model.mongooseResolvers.updateMany(),
            [`${name}RemoveById`]: model.mongooseResolvers.removeById(),
            [`${name}RemoveOne`]: model.mongooseResolvers.removeOne(),
            [`${name}RemoveMany`]: model.mongooseResolvers.removeMany(),
        };

        schemaComposer.Query.addFields({
            ...queries,
        });
    
        schemaComposer.Mutation.addFields({
            ...mutations,
        });
    }

    return schemaComposer.buildSchema();
};

export default createGraphQLSchema([SubjectTC, UniversityTC]);
