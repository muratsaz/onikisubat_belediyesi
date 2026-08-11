import api from "./api";

export const uploadImage = async (
  file: File,
  module: string = "news"
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/upload/${module}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const uploadMedia = async (
  file: File,
  category: string
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("category", category);

  const response = await api.post(
    "/media/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};