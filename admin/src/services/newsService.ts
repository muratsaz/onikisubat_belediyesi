import api from "./api";

import type {
  NewsFormData,
} from "../components/news/NewsForm";

export const getAllNews = async (): Promise<any[]> => {
  const response = await api.get("/news/");
  return response.data;
};

export const getNews = async (id: number) => {
  const response = await api.get(`/news/${id}`);
  return response.data;
};

export const createNews = async (
  data: NewsFormData
) => {
  const response = await api.post("/news/", {
    title: data.title,
    summary: data.summary,
    content: data.content,
    category: data.category,
    author: data.author,
    image: data.image,
    is_published: data.status === "Yayında",
    published_at: data.publishDate, // EKSİK OLAN KISIM EKLENDİ
  });

  return response.data;
};

export const updateNews = async (
  id: number,
  data: Partial<NewsFormData>
) => {
  const response = await api.put(
    `/news/${id}`,
    {
      title: data.title,
      summary: data.summary,
      content: data.content,
      category: data.category,
      author: data.author,
      image: data.image,
      is_published: data.status === "Yayında",
      published_at: data.publishDate, // EKSİK OLAN KISIM EKLENDİ
    }
  );

  return response.data;
};

export const deleteNews = async (
  id: number
) => {
  await api.delete(`/news/${id}`);
};