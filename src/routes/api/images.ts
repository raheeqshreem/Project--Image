import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { resizeImage } from '../../utilities/imageProcessor.js';

const imagesRouter = express.Router();

imagesRouter.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (!filename || !width || !height) {
    return res.status(400).send('Error: Missing filename, width, or height.');
  }

  if (width <= 0 || height <= 0) {
    return res.status(400).send('Error: Width and height must be positive numbers.');
  }

  const fullImagePath = path.resolve(`./assets/full/${filename}.jpg`);
  const thumbPath = path.resolve(`./assets/thumb`);
  const thumbImagePath = path.resolve(thumbPath, `${filename}-${width}x${height}.jpg`);

  if (!fs.existsSync(fullImagePath)) {
    return res.status(404).send('Error: Image not found.');
  }

  if (fs.existsSync(thumbImagePath)) {
    return res.sendFile(thumbImagePath);
  }

  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }

  try {
    await resizeImage(fullImagePath, thumbImagePath, width, height);
    res.sendFile(thumbImagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the image.');
  }
});

export default imagesRouter;
