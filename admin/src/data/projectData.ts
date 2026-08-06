export interface Project {
  id: number;
  title: string;
  summary: string;
  content: string;

  image: string;

  location: string;

  status:
    | "Planlanıyor"
    | "Devam Ediyor"
    | "Tamamlandı";

  publishStatus:
    | "Yayında"
    | "Taslak";

  publishDate: string;
}

export const projectData: Project[] = [];