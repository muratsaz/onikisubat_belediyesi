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

export const getNavigation = async (): Promise<Navigation[]> => {
  const response = await api.get<Navigation[]>("/navigation/");
  return response.data;
};