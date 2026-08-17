import api from "./api";

export interface CouncilMember {
  id: number;
  name: string;
  party: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface CouncilMemberCreateData {
  name: string;
  party: string;
  image: string | null;
}

export interface CouncilMemberUpdateData {
  name: string;
  party: string;
  image: string | null;
}

export const getCouncilMembers = async (): Promise<CouncilMember[]> => {
  const response = await api.get("/council-members/");
  return response.data;
};

export const getCouncilMember = async (
  id: number
): Promise<CouncilMember> => {
  const response = await api.get(`/council-members/${id}`);
  return response.data;
};

export const createCouncilMember = async (
  data: CouncilMemberCreateData
): Promise<CouncilMember> => {
  const response = await api.post("/council-members/", data);
  return response.data;
};

export const updateCouncilMember = async (
  id: number,
  data: CouncilMemberUpdateData
): Promise<CouncilMember> => {
  const response = await api.put(`/council-members/${id}`, data);
  return response.data;
};

export const deleteCouncilMember = async (
  id: number
): Promise<void> => {
  await api.delete(`/council-members/${id}`);
};