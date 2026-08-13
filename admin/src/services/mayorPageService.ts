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

export interface MayorPageUpdate {
  name: string;
  title: string;
  description: string;
  image: string | null;
}

export const getMayorPage = async (): Promise<MayorPage> => {
  const response = await api.get("/mayor-page/");
  return response.data;
};

export const updateMayorPage = async (
  data: MayorPageUpdate
): Promise<MayorPage> => {
  const response = await api.put("/mayor-page/", data);
  return response.data;
};