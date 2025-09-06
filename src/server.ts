import express from 'express';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

// هذا هو الجزء الجديد الذي يقوم بإنشاء __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// استخدام الموجه الرئيسي وتحديد المسار الأساسي له
app.use('/api', routes);

// تقديم مجلد الصور المصغرة كملفات ثابتة
app.use('/thumb', express.static(path.resolve(__dirname, '../assets/thumb')));

// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
