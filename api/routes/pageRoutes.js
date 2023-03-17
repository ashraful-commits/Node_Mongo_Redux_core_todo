import express from 'express';
import {
  deleteProduct,
  editProduct,
  getAllProduct,
  postProduct,
  singleProduct,
} from '../controllers/pageControllers.js';
import { photoMulter } from '../middleware/multer.js';

//====================crate route

const Productrouter = express.Router();

Productrouter.get('/', getAllProduct);
Productrouter.get('/:id', singleProduct);
Productrouter.delete('/:id', deleteProduct);
Productrouter.put('/:id', photoMulter, editProduct);
Productrouter.patch('/:id', photoMulter, editProduct);
Productrouter.post('/', photoMulter, postProduct);
export default Productrouter;
