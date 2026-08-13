import api from "./api";

export type MediaCategory =
  | "genel"
  | "kurumsal"
  | "haberler"
  | "projeler"
  | "baskan";

export interface Media {
  id: number;
  file_name: string;
  file_path: string;
  category: MediaCategory;
  mime_type: string | null;
  file_size: number;
  created_at: string;
}

export const getAllMedia = async (
  category?: MediaCategory
): Promise<Media[]> => {
  const response = await api.get("/media/", {
    params: category ? { category } : {},
  });

  return response.data;
};

export const getMedia = async (
  id: number
): Promise<Media> => {
  const response = await api.get(`/media/${id}`);

  return response.data;
};

export const uploadMedia = async (
  file: File,
  category: MediaCategory = "genel"
): Promise<Media> => {
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

export const deleteMedia = async (
  id: number
): Promise<void> => {
  await api.delete(`/media/${id}`);
};