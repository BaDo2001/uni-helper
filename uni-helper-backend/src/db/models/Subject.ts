import { Schema } from 'mongoose';
import { modelsFromSchema } from '../db';

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
});

export const [Subject, SubjectTC] = modelsFromSchema(schema, 'Subject');
