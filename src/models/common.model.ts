import { v4 } from 'uuid';

export const COMMON_SCHEMA = {
  _id: {
    type: String,
    default: v4,
  },
};

export const COMMON_SCHEMA_OPTIONS = {
  timestamps: true,
};
