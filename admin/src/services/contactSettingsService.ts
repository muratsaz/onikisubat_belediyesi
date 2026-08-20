import api from "./api";

export interface ContactSettings {
  id: number;

  phone?: string | null;
  fax?: string | null;
  email?: string | null;
  kep?: string | null;

  website?: string | null;
  working_hours?: string | null;
  address?: string | null;

  instagram?: string | null;
  facebook?: string | null;
  x?: string | null;
  youtube?: string | null;

  whatsapp?: string | null;
  alo_153?: string | null;
  e_belediye_url?: string | null;

  updated_at: string;
}

export type ContactSettingsFormData = Omit<
  ContactSettings,
  "id" | "updated_at"
>;

export const getContactSettings = async (): Promise<ContactSettings> => {
  const response = await api.get<ContactSettings>(
    "/contact-settings"
  );

  return response.data;
};

export const createContactSettings = async (
  data: ContactSettingsFormData
): Promise<ContactSettings> => {
  const response = await api.post<ContactSettings>(
    "/contact-settings",
    data
  );

  return response.data;
};

export const updateContactSettings = async (
  data: ContactSettingsFormData
): Promise<ContactSettings> => {
  const response = await api.put<ContactSettings>(
    "/contact-settings",
    data
  );

  return response.data;
};