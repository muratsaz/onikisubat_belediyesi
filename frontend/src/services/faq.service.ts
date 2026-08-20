import api from "./api";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export const getFAQs = async (): Promise<FAQ[]> => {
  const response = await api.get<FAQ[]>("/faqs/");
  return response.data;
};