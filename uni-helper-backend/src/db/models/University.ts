import { Schema } from 'mongoose';
import { modelsFromSchema } from '../db';

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

export const [University, UniversityTC] = modelsFromSchema(schema, 'University');
