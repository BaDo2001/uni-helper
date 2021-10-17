import { composeMongoose, ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose';
import mongoose, { Model, model, Schema } from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modelsFromSchema = (schema: Schema, modelName: string): [Model<any>, ObjectTypeComposerWithMongooseResolvers<any, any>] => {
    const modelForSchema = model(modelName, schema);

    return [modelForSchema, composeMongoose(modelForSchema, {})];
};
