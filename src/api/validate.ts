import AJV from 'ajv';
import schema from './schema.json';

/** JSON schema for validating imported profiles */
export const importSchema = schema;

/** validate imported files */
export const validate = new AJV({
  allowUnionTypes: true,
}).compile(schema);
