import { CommonStatus, ContactState } from '$types/enum';

export const createContactSchema: AjvSchema = {
  type: 'object',
  required: ['name', 'address', 'phone', 'email', 'description'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    address: {
      type: 'string',
      minLength: 1,
    },
    phone: {
      type: 'string',
      minLength: 1,
    },
    email: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
      minLength: 1,
    },
  },
};

export const updateContactSchema: AjvSchema = {
  type: 'object',
  required: [],
  additionalProperties: false,
  properties: {
    status: {
      enum: [CommonStatus.ACTIVE, CommonStatus.INACTIVE],
    },
    state: {
      enum: [ContactState.PENDING, ContactState.RESOLVED, ContactState.REJECT],
    },
  },
};
