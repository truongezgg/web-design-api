export const updateProfileSchema: AjvSchema = {
  type: 'object',
  required: [],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      maxLength: 255,
    },
  },
};
