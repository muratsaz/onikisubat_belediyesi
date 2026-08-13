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

export const getMayor = async (): Promise<Mayor> => {
  const response = await api.get("/mayor/");
  return response.data;
};