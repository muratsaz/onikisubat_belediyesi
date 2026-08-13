import api from "./api";

export interface MayorPage {
  id: number;
  name: string;
  title: string;
  description: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export const getMayorPage = async (): Promise<MayorPage> => {
  const response = await api.get("/mayor-page/");
  return response.data;
};