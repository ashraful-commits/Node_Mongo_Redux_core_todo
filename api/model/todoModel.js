import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const todoModel = mongoose.model('todo', todoSchema);
