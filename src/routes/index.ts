import express from 'express';
import imagesRouter from './api/images.js';

const routes = express.Router();

// رسالة ترحيب عند الدخول على /api
routes.get('/', (req, res) => {
  res.send('Welcome to the Image Processing API!');
});

// استخدام الموجه الخاص بالصور
routes.use('/images', imagesRouter);

export default routes;
