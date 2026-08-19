import api from "./api";

export interface Navigation {
  id: number;
  title: string;
  path: string;
  item_type: string;
  display_order: number;
  is_active: boolean;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface NavigationCreate {
  title: string;
  path: string;
  item_type: string;
  display_order: number;
  is_active: boolean;
  parent_id: number | null;
}

export interface NavigationUpdate {
  title?: string;
  path?: string;
  item_type?: string;
  display_order?: number;
  is_active?: boolean;
  parent_id?: number | null;
}

export const getAllNavigation = async (): Promise<Navigation[]> => {
  const response = await api.get("/navigation/");
  return response.data;
};

export const createNavigation = async (
  data: NavigationCreate
): Promise<Navigation> => {
  const response = await api.post("/navigation/", data);
  return response.data;
};

export const updateNavigation = async (
  id: number,
  data: NavigationUpdate
): Promise<Navigation> => {
  const response = await api.put(`/navigation/${id}`, data);
  return response.data;
};

export const deleteNavigation = async (
  id: number
): Promise<void> => {
  await api.delete(`/navigation/${id}`);
};

export const updateNavigationOrder = async (
  items: { id: number; display_order: number }[]
): Promise<Navigation[]> => {
  const response = await api.put(
    "/navigation/order/update",
    items
  );

  return response.data;
};