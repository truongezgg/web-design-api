import { CommonStatus } from '$types/enum';

export const createSponsorSchema: AjvSchema = {
  type: 'object',
  required: ['name', 'avatar'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    avatar: {
      type: 'string',
      minLength: 0,
    },
  },
};

export const updateSponsorSchema: AjvSchema = {
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
      minLength: 0,
    },
    status: {
      enum: [CommonStatus.ACTIVE, CommonStatus.INACTIVE],
    },
  },
};
