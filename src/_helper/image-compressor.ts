import Compressor from "compressorjs";

export const imageCompressor = async (image: File) => {
  try {
    return await new Promise((resolve, reject) => {
      new Compressor(image, {
        quality: 0.7,
        mimeType: "image/jpeg",
        success(result) {
          const res = result as Blob;
          resolve(
            new File([res], image.name, {
              type: result.type,
              lastModified: new Date().getTime(),
            }),
          );
        },
        error(error) {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};
