import { getModelForClass, prop } from '@typegoose/typegoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import type { Document } from 'mongoose';
import type { Context } from '../../graphql/schema';

class SubjectSchema {
    @prop({ required: true })
    public neptunId!: string;

    @prop({ required: true })
    public university!: string;

    @prop({ required: true })
    public faculty!: string;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public credits!: number;
}

export const Subject = getModelForClass(SubjectSchema, { schemaOptions: { collection: 'subjects' } });
export const SubjectTC = composeMongoose<Document<SubjectSchema> & SubjectSchema, Context>(Subject);
