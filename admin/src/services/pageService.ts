import api from "./api";

export interface PageData {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PageUpdateData {
  title: string;
  summary: string;
  content: string;
  cover_image?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  is_published: boolean;
}

export const getAllPages = async (): Promise<PageData[]> => {
  const response = await api.get("/pages/");
  return response.data;
};

export const getPageBySlug = async (
  slug: string
): Promise<PageData> => {
  const response = await api.get(`/pages/slug/${slug}`);
  return response.data;
};

export const getPageById = async (
  id: number
): Promise<PageData> => {
  const response = await api.get(`/pages/${id}`);
  return response.data;
};

export const updatePage = async (
  id: number,
  data: PageUpdateData
): Promise<PageData> => {
  const response = await api.put(
    `/pages/${id}`,
    data
  );

  return response.data;
};

export const createPage = async (
  data: PageUpdateData
): Promise<PageData> => {
  const response = await api.post(
    "/pages/",
    data
  );

  return response.data;
};

export const deletePage = async (
  id: number
): Promise<void> => {
  await api.delete(`/pages/${id}`);
};