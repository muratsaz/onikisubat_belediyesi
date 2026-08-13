import api from "./api";

export interface Mayor {
  id: number;
  name: string;
  title: string;
  description: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface MayorUpdateData {
  name: string;
  title: string;
  description: string | null;
  image: string | null;
}

export interface MayorMedia {
  id: number;
  file_name: string;
  file_path: string;
  category: string;
  mime_type: string | null;
  file_size: number;
  created_at: string;
}

export const getMayor = async (): Promise<Mayor> => {
  const response = await api.get("/mayor/");
  return response.data;
};

export const updateMayor = async (
  data: MayorUpdateData
): Promise<Mayor> => {
  const response = await api.put("/mayor/", data);
  return response.data;
};

export const uploadMayorImage = async (
  file: File
): Promise<MayorMedia> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("category", "baskan");

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