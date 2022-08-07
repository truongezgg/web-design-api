import { CommonStatus } from '$types/enum';

export const createPostSchema: AjvSchema = {
  type: 'object',
  required: [
    'category',
    'name',
    'avatar',
    'location',
    'area',
    'design',
    'year',
    'description',
    'payload',
    'images',
  ],
  additionalProperties: false,
  properties: {
    category: {
      type: 'string',
      minLength: 1,
    },
    isDefault: {
      enum: [CommonStatus.ACTIVE, CommonStatus.INACTIVE],
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    avatar: {
      type: 'string',
      minLength: 0,
    },
    location: {
      type: 'string',
      minLength: 0,
    },
    area: {
      type: 'string',
      minLength: 0,
    },
    design: {
      type: 'string',
      minLength: 0,
    },
    year: {
      type: 'string',
      minLength: 0,
    },
    description: {
      type: 'string',
      minLength: 0,
    },
    payload: {
      type: 'object',
    },
    images: {
      type: 'array',
      items: {
        type: 'object',
        required: ['priority', 'url'],
        additionalProperties: false,
        properties: {
          priority: {
            type: 'integer',
          },
          url: { type: 'string', minLength: 1 },
        },
      },
    },
    videos: {
      type: 'array',
      items: {
        type: 'object',
        required: ['url'],
        additionalProperties: false,
        properties: {
          url: { type: 'string', minLength: 1 },
        },
      },
    },
  },
};

export const updatePostSchema: AjvSchema = {
  type: 'object',
  required: [],
  additionalProperties: false,
  properties: {
    category: {
      type: 'string',
      minLength: 1,
    },
    isDefault: {
      enum: [CommonStatus.ACTIVE, CommonStatus.INACTIVE],
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    avatar: {
      type: 'string',
      minLength: 0,
    },
    location: {
      type: 'string',
      minLength: 0,
    },
    area: {
      type: 'string',
      minLength: 0,
    },
    design: {
      type: 'string',
      minLength: 0,
    },
    year: {
      type: 'string',
      minLength: 0,
    },
    description: {
      type: 'string',
      minLength: 0,
    },
    payload: {
      type: 'object',
    },
    status: {
      enum: [CommonStatus.ACTIVE, CommonStatus.INACTIVE],
    },
    images: {
      type: 'array',
      items: {
        type: 'object',
        required: ['priority', 'url'],
        additionalProperties: false,
        properties: {
          priority: {
            type: 'integer',
          },
          url: { type: 'string', minLength: 1 },
        },
      },
    },
    videos: {
      type: 'array',
      items: {
        type: 'object',
        required: ['url'],
        additionalProperties: false,
        properties: {
          url: { type: 'string', minLength: 1 },
        },
      },
    },
  },
};
