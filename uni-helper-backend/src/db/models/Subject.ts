import { Schema } from 'mongoose';
import { modelsFromSchema } from '../db';

const schema = new Schema({
    neptunId: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
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
