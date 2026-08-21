import api from "./api";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_at?: string;
  updated_at?: string;
}

export interface FAQCreate {
  question: string;
  answer: string;
}

export interface FAQUpdate {
  question?: string;
  answer?: string;
}

export const getFAQs = async (): Promise<FAQ[]> => {
  const response = await api.get("/faqs");
  return response.data;
};

export const createFAQ = async (
  data: FAQCreate
): Promise<FAQ> => {
  const response = await api.post("/faqs", data);
  return response.data;
};

export const updateFAQ = async (
  id: number,
  data: FAQUpdate
): Promise<FAQ> => {
  const response = await api.put(`/faqs/${id}`, data);
  return response.data;
};

export const deleteFAQ = async (
  id: number
): Promise<void> => {
  await api.delete(`/faqs/${id}`);
};