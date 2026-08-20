import api from "./api";

export interface ContactSettings {
  id: number;

  phone?: string | null;
  fax?: string | null;
  email?: string | null;
  kep?: string | null;

  address?: string | null;
  working_hours?: string | null;

  website?: string | null;
  whatsapp?: string | null;

  instagram?: string | null;
  facebook?: string | null;
  x?: string | null;
  youtube?: string | null;

  e_belediye_url?: string | null;
  alo_153?: string | null;

  map_url?: string | null;

  created_at: string;
  updated_at: string;
}

export interface ContactMessageCreate {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactMessageResponse {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const getContactSettings = async (): Promise<ContactSettings> => {
  const response = await api.get<ContactSettings>(
    "/contact-settings/"
  );

  return response.data;
};

export const sendContactMessage = async (
  data: ContactMessageCreate
): Promise<ContactMessageResponse> => {
  const response = await api.post<ContactMessageResponse>(
    "/contact-messages/",
    data
  );

  return response.data;
};