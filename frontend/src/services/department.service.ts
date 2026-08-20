import api from "./api";

export interface Department {
  id: number;
  name: string;
  manager_name?: string | null;
  manager_image?: string | null;
  phone?: string | null;
  extension?: string | null;
  email?: string | null;
  created_at: string;
  updated_at: string;
}

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get<Department[]>(
    "/departments/"
  );

  return response.data;
};
