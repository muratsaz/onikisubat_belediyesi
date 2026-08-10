import api from "./api";

export const getAllProjects = async () => {
  const response = await api.get("/projects/");
  return response.data;
};

export const getProject = async (id: number) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};