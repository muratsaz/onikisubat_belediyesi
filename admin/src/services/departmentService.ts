import api from "./api";

export interface Department {
  id: number;
  name: string;

  manager_name: string | null;
  manager_image: string | null;

  phone: string | null;
  extension: string | null;
  email: string | null;

  created_at: string;
  updated_at: string;
}

export interface DepartmentPayload {
  name: string;

  manager_name?: string | null;
  manager_image?: string | null;

  phone?: string | null;
  extension?: string | null;
  email?: string | null;
}

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get("/departments/");
  return response.data;
};

export const createDepartment = async (
  data: DepartmentPayload
): Promise<Department> => {
  const response = await api.post("/departments/", data);
  return response.data;
};

export const updateDepartment = async (
  id: number,
  data: DepartmentPayload
): Promise<Department> => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data;
};

export const deleteDepartment = async (
  id: number
): Promise<void> => {
  await api.delete(`/departments/${id}`);
};