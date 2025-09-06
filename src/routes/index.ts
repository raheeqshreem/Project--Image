import express from 'express';
import imagesRouter from './api/images.js';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the Image Processing API!');
});

routes.use('/images', imagesRouter);

export default routes;
