import { todoModel } from '../model/todoModel.js';

export const getAlltodo = async (req, res, next) => {
  try {
    const data = await todoModel.find();
    res.status(200).json({
      todo: data,
      message: 'all todo',
    });
  } catch (error) {
    next(error);
  }
};
export const todoPost = async (req, res, next) => {
  const { text } = req.body;

  try {
    const data = await todoModel.create({
      text,
      status: 'pandding',
    });
    res.status(200).json({
      todo: data,
      message: 'post todo',
    });
  } catch (error) {
    next(error);
  }
};
//===============single data
export const todoSingledata = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await todoModel.findById(id);
    res.status(200).json({
      todo: data,
      message: 'post todo',
    });
  } catch (error) {
    next(error);
  }
};
//===============single data
export const todoUpdate = async (req, res, next) => {
  const { text, status } = req.body;
  const { id } = req.params;
  console.log(req.body);
  console.log(id);
  try {
    const data = await todoModel.findByIdAndUpdate(
      id,
      {
        text,
        status,
      },
      { new: true }
    );
    res.status(200).json({
      todo: data,
      message: 'post todo',
    });
  } catch (error) {
    next(error);
  }
};
export const todoDelet = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await todoModel.findByIdAndDelete(id);
    res.status(200).json({
      todo: data,
      message: 'post todo',
    });
  } catch (error) {
    next(error);
  }
};
