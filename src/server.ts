import express from 'express';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/api', routes);

app.use('/thumb', express.static(path.resolve(__dirname, '../assets/thumb')));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
