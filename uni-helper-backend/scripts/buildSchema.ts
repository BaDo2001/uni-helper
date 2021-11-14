import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import schema from '../src/graphql/schema';

const fileData = printSchema(schema);

writeFileSync('../schema.graphql', fileData);
