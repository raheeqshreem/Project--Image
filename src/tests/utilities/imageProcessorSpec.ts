import path, { dirname } from 'path'; // Modified this line
import fs from 'fs';
import { resizeImage } from '../../utilities/imageProcessor.js'; // Modified this line
import { fileURLToPath } from 'url'; // Added this line

// This is the new code that recreates __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Test image processing utility', () => {
  it('should resize an image successfully', async () => {
    const sourcePath = path.resolve('./assets/full/fjord.jpg');
    const outputPath = path.resolve('./assets/thumb/test-fjord-100x100.jpg');
    const width = 100;
    const height = 100;

    await resizeImage(sourcePath, outputPath, width, height);

    expect(fs.existsSync(outputPath)).toBeTrue();

    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it('should throw an error for a non-existent source image', async () => {
    const sourcePath = path.resolve(__dirname, 'nonexistent.jpg');
    const outputPath = path.resolve(__dirname, 'output.jpg');

    await expectAsync(resizeImage(sourcePath, outputPath, 100, 100)).toBeRejected();
  });
});