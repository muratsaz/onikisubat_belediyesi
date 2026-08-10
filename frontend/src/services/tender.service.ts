import api from "./api";

export interface TenderDocument {
  id: number;
  tender_id: number;
  file_name: string;
  file_path: string;
  created_at: string;
}

export interface Tender {
  id: number;
  title: string;
  tender_number: string;
  description: string | null;
  publish_date: string;
  deadline: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TenderDetail extends Tender {
  documents: TenderDocument[];
}

export const getAllTenders = async (): Promise<Tender[]> => {
  const response = await api.get("/tenders/");
  return response.data;
};

export const getTender = async (
  id: number
): Promise<TenderDetail> => {
  const response = await api.get(`/tenders/${id}`);
  return response.data;
};

export const getTenderDetails = async (
  id: number
): Promise<TenderDetail> => {
  const response = await api.get(`/tenders/${id}`);
  return response.data;
};

export const getTenderDocuments = async (
  id: number
): Promise<TenderDocument[]> => {
  const response = await api.get(
    `/tenders/${id}/documents`
  );

  return response.data;
};