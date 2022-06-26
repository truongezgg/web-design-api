import Ajv from 'ajv';

export const createConfigSchema: AjvSchema = {
  type: 'object',
  required: ['key', 'value'],
  additionalProperties: false,
  properties: {
    key: {
      type: 'string',
      minLength: 1,
    },
    value: {
      type: ['string', 'object'],
    },
  },
};

export const updateConfigSchema: AjvSchema = {
  type: 'object',
  required: ['key', 'value'],
  additionalProperties: false,
  properties: {
    key: {
      type: 'string',
      minLength: 1,
    },
    value: {
      type: ['string', 'object'],
    },
  },
};

export const deleteConfigSchema: AjvSchema = {
  type: 'object',
  required: ['key'],
  additionalProperties: false,
  properties: {
    key: {
      type: 'string',
      minLength: 1,
    },
  },
};
