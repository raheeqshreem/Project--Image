import sharp from 'sharp';

export const resizeImage = async (
  sourcePath: string,
  outputPath: string,
  width: number,
  height: number,
): Promise<void> => {
  try {
    await sharp(sourcePath).resize(width, height).toFile(outputPath);
  } catch (error) {
    console.error('Image processing failed:', error);
    throw new Error('Could not process image.');
  }
};
