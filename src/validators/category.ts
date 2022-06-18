import { CommonStatus } from '$types/enum';

export const createCategorySchema: AjvSchema = {
  type: 'object',
  required: ['name', 'avatar', 'description'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    avatar: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
};

export const updateCategorySchema: AjvSchema = {
  type: 'object',
  required: [],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    avatar: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    status: {
      enum: [CommonStatus.ACTIVE, CommonStatus.INACTIVE],
    },
  },
};
