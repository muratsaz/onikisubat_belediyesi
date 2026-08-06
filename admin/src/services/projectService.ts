import api from "./api";

import type {
  ProjectFormData,
} from "../components/project/ProjectForm";

export const getAllProjects = async (): Promise<any[]> => {
  const response = await api.get("/projects/");
  return response.data;
};

export const getProject = async (id: number) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (
  data: ProjectFormData
) => {
  const response = await api.post("/projects/", {
    title: data.title,
    summary: data.summary,
    content: data.content,
    image: data.image,
    location: data.location,
    status: data.status,
    is_published: data.isPublished,
    published_at: data.publishDate,
  });

  return response.data;
};

export const updateProject = async (
  id: number,
  data: Partial<ProjectFormData>
) => {
  const response = await api.put(
    `/projects/${id}`,
    {
      title: data.title,
      summary: data.summary,
      content: data.content,
      image: data.image,
      location: data.location,
      status: data.status,
      is_published: data.isPublished,
      published_at: data.publishDate,
    }
  );

  return response.data;
};

export const deleteProject = async (
  id: number
) => {
  await api.delete(`/projects/${id}`);
};