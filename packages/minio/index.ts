import * as Minio from "minio";

const minioClient = new Minio.Client({
	endPoint: "localhost",
	port: 9000,
	useSSL: false,
	accessKey: "skyline146",
	secretKey: "1234567890",
});

const buckets = await minioClient.listBuckets();

await minioClient.fGetObject(
	buckets[0].name,
	"e4b5acfb52378a38cb423d125d119750.jpg",
	"./tmp/test1.jpg",
);

await minioClient.fPutObject(
	buckets[0].name,
	"my_picture123.jpg",
	"./tmp/test1.jpg",
);
