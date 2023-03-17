import { productModel } from '../model/productModel.js';

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await productModel.find();
    res.status(200).json({
      products: data,
      message: 'all product',
    });
  } catch (error) {
    next(error);
  }
};
export const postProduct = async (req, res, next) => {
  const { name, price, photo, slug } = req.body;

  try {
    const data = await productModel.create({
      name,
      price,
      photo: req.file.filename,
      slug,
    });
    res.status(200).json({
      products: data,
      message: 'post product',
    });
  } catch (error) {
    next(error);
  }
};
//===================================single product
export const singleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productModel.findById(id);
    res.status(200).json({
      products: data,
      message: 'single product',
    });
  } catch (error) {
    next(error);
  }
};
//===================================single edit product
export const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, slug } = req.body;

    const data = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        slug,
      },
      { new: true }
    );
    res.status(200).json({
      products: data,
      message: 'edit product',
    });
  } catch (error) {
    next(error);
  }
};
//===================================single delte product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await productModel.findByIdAndDelete(id);
    res.status(200).json({
      products: data,
      message: 'delete product',
    });
  } catch (error) {
    next(error);
  }
};
