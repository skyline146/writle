import sharp from "sharp";
import { getFileExtension } from "./get-file-extension";

interface Options {
	fileBuffer: Buffer;
	size: number;
	fileName: string;
}

export const getPictureBlurhashUrl = async ({
	fileBuffer,
	size,
	fileName,
}: Options) => {
	const mediaFileFormat = getFileExtension(fileName);
	let mediaFileBuffer = fileBuffer;

	if (mediaFileFormat === ".gif")
		mediaFileBuffer = await sharp(mediaFileBuffer).jpeg().toBuffer();

	const resizedBlurredImage = await sharp(mediaFileBuffer)
		.resize({
			width: size,
			height: size,
		})
		.blur()
		.toBuffer();

	return `data:image/png;base64,${resizedBlurredImage.toString("base64")}`;
};
