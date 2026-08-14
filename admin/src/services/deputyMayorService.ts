import api from "./api";

export interface DeputyMayor {
  id: number;
  name: string;
  phone: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeputyMayorCreateData {
  name: string;
  phone: string;
  image: string | null;
}

export interface DeputyMayorUpdateData {
  name: string;
  phone: string;
  image: string | null;
}

export interface DeputyMayorUploadResponse {
  message: string;
  filename: string;
  original_filename: string;
  module: string;
  path: string;
  url: string;
}

export const getDeputyMayors = async (): Promise<DeputyMayor[]> => {
  const response = await api.get("/deputy-mayors/");
  return response.data;
};

export const getDeputyMayor = async (
  id: number
): Promise<DeputyMayor> => {
  const response = await api.get(`/deputy-mayors/${id}`);
  return response.data;
};

export const createDeputyMayor = async (
  data: DeputyMayorCreateData
): Promise<DeputyMayor> => {
  const response = await api.post("/deputy-mayors/", data);
  return response.data;
};

export const updateDeputyMayor = async (
  id: number,
  data: DeputyMayorUpdateData
): Promise<DeputyMayor> => {
  const response = await api.put(
    `/deputy-mayors/${id}`,
    data
  );

  return response.data;
};

export const deleteDeputyMayor = async (
  id: number
): Promise<void> => {
  await api.delete(`/deputy-mayors/${id}`);
};

export const uploadDeputyMayorImage = async (
  file: File
): Promise<DeputyMayorUploadResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/upload/deputy_mayors",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};