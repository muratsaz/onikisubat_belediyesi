import api from "./api";

export interface ContactMessage {
  id: number;

  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;

  is_read: boolean;
  created_at: string;
}

export interface ContactMessageUpdate {
  is_read: boolean;
}

export const getAllContactMessages = async (): Promise<
  ContactMessage[]
> => {
  const response = await api.get<ContactMessage[]>(
    "/contact-messages/"
  );

  return response.data;
};

export const getContactMessageById = async (
  id: number
): Promise<ContactMessage> => {
  const response = await api.get<ContactMessage>(
    `/contact-messages/${id}`
  );

  return response.data;
};

export const updateContactMessage = async (
  id: number,
  data: ContactMessageUpdate
): Promise<ContactMessage> => {
  const response = await api.put<ContactMessage>(
    `/contact-messages/${id}`,
    data
  );

  return response.data;
};

export const deleteContactMessage = async (
  id: number
): Promise<void> => {
  await api.delete(`/contact-messages/${id}`);
};