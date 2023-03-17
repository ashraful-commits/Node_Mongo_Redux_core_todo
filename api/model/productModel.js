import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model('product', productSchema);
