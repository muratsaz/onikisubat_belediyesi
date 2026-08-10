import api from "./api";
import { uploadImage } from "./uploadService";

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

export interface TenderFormData {
  title: string;
  tenderNumber: string;
  description: string;
  publishDate: string;
  deadline: string;
  status: string;
  documentFile?: File | null;
}

export interface TenderDocument {
  id: number;
  tender_id: number;
  file_name: string;
  file_path: string;
  created_at: string;
}

export const getAllTenders = async (): Promise<Tender[]> => {
  const response = await api.get("/tenders/");
  return response.data;
};

export const getTender = async (
  id: number
): Promise<Tender> => {
  const response = await api.get(`/tenders/${id}`);
  return response.data;
};

export const getTenderDocuments = async (
  tenderId: number
): Promise<TenderDocument[]> => {
  const response = await api.get(
    `/tenders/${tenderId}/documents`
  );

  return response.data;
};

export const uploadTenderDocument = async (
  tenderId: number,
  file: File
): Promise<TenderDocument> => {
  const uploadResponse = await uploadImage(
    file,
    "tenders"
  );

  const response = await api.post(
    `/tenders/${tenderId}/documents`,
    {
      file_name: file.name,
      file_path: uploadResponse.path,
    }
  );

  return response.data;
};

export const createTender = async (
  data: TenderFormData
): Promise<Tender> => {
  const response = await api.post("/tenders/", {
    title: data.title,
    tender_number: data.tenderNumber,
    description: data.description,
    publish_date: data.publishDate,
    deadline: data.deadline,
    status: data.status,
  });

  const tender = response.data;

  if (data.documentFile) {
    await uploadTenderDocument(
      tender.id,
      data.documentFile
    );
  }

  return tender;
};

export const updateTender = async (
  id: number,
  data: Partial<TenderFormData>
): Promise<Tender> => {
  const response = await api.put(`/tenders/${id}`, {
    title: data.title,
    tender_number: data.tenderNumber,
    description: data.description,
    publish_date: data.publishDate,
    deadline: data.deadline,
    status: data.status,
  });

  const tender = response.data;

  if (data.documentFile) {
    await uploadTenderDocument(
      id,
      data.documentFile
    );
  }

  return tender;
};

export const deleteTender = async (
  id: number
): Promise<void> => {
  await api.delete(`/tenders/${id}`);
};