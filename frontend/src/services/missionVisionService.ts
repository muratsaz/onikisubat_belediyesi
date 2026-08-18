import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export interface MissionVision {
  id: number;
  mission: string;
  vision: string;
  created_at: string;
  updated_at: string;
}

export const getMissionVision =
  async (): Promise<MissionVision> => {
    const response = await axios.get(
      `${API_URL}/mission-vision/`
    );

    return response.data;
  };