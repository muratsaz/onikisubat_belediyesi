import api from "./api";

import type {
  AnnouncementFormData,
} from "../components/announcement/AnnouncementForm";

export const getAllAnnouncements = async (): Promise<any[]> => {
  const response = await api.get("/announcements/");
  return response.data;
};

export const getAnnouncement = async (id: number) => {
  const response = await api.get(`/announcements/${id}`);
  return response.data;
};

export const createAnnouncement = async (
  data: AnnouncementFormData
) => {
  const response = await api.post("/announcements/", {
    title: data.title,
    summary: data.summary,
    content: data.content,
    category: data.category,
    is_published: data.status === "Yayında",
    published_at: data.publishDate,
  });

  return response.data;
};

export const updateAnnouncement = async (
  id: number,
  data: Partial<AnnouncementFormData>
) => {
  const response = await api.put(`/announcements/${id}`, {
    title: data.title,
    summary: data.summary,
    content: data.content,
    category: data.category,
    is_published: data.status === "Yayında",
    published_at: data.publishDate,
  });

  return response.data;
};

export const deleteAnnouncement = async (
  id: number
) => {
  await api.delete(`/announcements/${id}`);
};