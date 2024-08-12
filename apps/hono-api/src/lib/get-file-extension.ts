export const getFileExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.');
  return fileName.substring(lastDotIndex);
};
