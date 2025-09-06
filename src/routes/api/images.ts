import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { resizeImage } from '../../utilities/imageProcessor.js';

const imagesRouter = express.Router();

imagesRouter.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // 1. التحقق من وجود كل المدخلات
  if (!filename || !width || !height) {
    return res.status(400).send('Error: Missing filename, width, or height.');
  }

  // 2. التحقق من أن الأبعاد أرقام موجبة
  if (width <= 0 || height <= 0) {
    return res.status(400).send('Error: Width and height must be positive numbers.');
  }

  const fullImagePath = path.resolve(`./assets/full/${filename}.jpg`);
  const thumbPath = path.resolve(`./assets/thumb`);
  const thumbImagePath = path.resolve(thumbPath, `${filename}-${width}x${height}.jpg`);

  // 3. التحقق من وجود الصورة الأصلية
  if (!fs.existsSync(fullImagePath)) {
    return res.status(404).send('Error: Image not found.');
  }

  // 4. (Caching) التحقق إذا كانت الصورة المصغرة موجودة بالفعل
  if (fs.existsSync(thumbImagePath)) {
    return res.sendFile(thumbImagePath);
  }

  // 5. إنشاء مجلد thumb إذا لم يكن موجودًا
  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }

  // 6. معالجة الصورة وحفظها ثم إرسالها
  try {
    await resizeImage(fullImagePath, thumbImagePath, width, height);
    res.sendFile(thumbImagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the image.');
  }
});

export default imagesRouter;
