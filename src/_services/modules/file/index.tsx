export interface UploadResponse {
  id: number;
  url: string;
}

export const uploadFileBulk = async (
  token: string,
  image: File,
  id: number,
): Promise<UploadResponse> => {
  const bodyFormData = new FormData();
  bodyFormData.append("file", image);
  bodyFormData.append("type", "OTHER_URL");

  const response = await fetch(
    `${process.env.REACT_APP_MEDIA_HOST}/dump`,
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: bodyFormData,
    },
  );
  const data = await response.json();
  return { id, url: data.data.filename };
};

