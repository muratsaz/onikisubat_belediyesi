import api from "./api";

export interface Organization {
  id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export const getOrganization = async (): Promise<Organization | null> => {
  try {
    const response = await api.get("/organization/");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};

export const updateOrganization = async (
  image_url: string
): Promise<Organization> => {
  const response = await api.put("/organization/", {
    image_url,
  });

  return response.data;
};