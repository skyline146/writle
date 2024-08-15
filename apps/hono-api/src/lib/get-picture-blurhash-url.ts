import sharp from 'sharp';

export const getPictureBlurhashUrl = async (buffer: Buffer, size: number) => {
  const resizedImage = await sharp(buffer)
    .resize({
      width: size,
      height: size
    })
    .blur()
    .toBuffer();

  return `data:image/png;base64,${resizedImage.toString('base64')}`;
};
