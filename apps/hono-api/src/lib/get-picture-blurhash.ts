import sharp from 'sharp';

export const getPictureBlurhash = (buffer: Buffer, size: number) => {
  const resizedImage = sharp(buffer).resize({
    width: size,
    height: size
  });

  return `data:image/png;base64,${'base64'}`;
};
