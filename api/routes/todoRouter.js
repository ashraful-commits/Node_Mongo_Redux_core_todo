import express from 'express';

import {
  todoPost,
  getAlltodo,
  todoUpdate,
  todoSingledata,
  todoDelet,
} from '../controllers/todoContorler.js';

//====================crate route

const todorouter = express.Router();

todorouter.get('/', getAlltodo);
todorouter.post('/', todoPost);
todorouter.get('/:id', todoSingledata);
todorouter.delete('/:id', todoDelet);
todorouter.put('/:id', todoUpdate);
todorouter.patch('/:id', todoUpdate);

export default todorouter;
