import api from "./api";

export interface MissionVision {
  id: number;
  mission: string;
  vision: string;
  created_at: string;
  updated_at: string;
}

export interface MissionVisionUpdateData {
  mission: string;
  vision: string;
}

export const getMissionVision = async (): Promise<MissionVision> => {
  const response = await api.get("/mission-vision/");
  return response.data;
};

export const updateMissionVision = async (
  data: MissionVisionUpdateData
): Promise<MissionVision> => {
  const response = await api.put("/mission-vision/", data);
  return response.data;
};