import express, { json } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import mongoDBconnection from './config/Mongodbconncetion.js';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandel.js';
import Productrouter from './routes/pageRoutes.js';
import todorouter from './routes/todoRouter.js';

//===============================  dotenv contfig

dotenv.config();

//=========================    port int
const port = process.env.PORT || 9000;

//================================  create app

const app = express();
app.use(cors());
//======================== use of app

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//======================================  public
app.use(express.static('api/public'));
//======================  api

app.use('/Api/v2/product', Productrouter);
app.use('/Api/v2/todo', todorouter);
//=======================================error handler
app.use(errorHandler);
//==========================server listen
app.listen(port, () => {
  mongoDBconnection();
  console.log(`server is running on port ${port}`.bgCyan.black);
});
