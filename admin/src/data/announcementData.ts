export interface Announcement {
  id: number;
  title: string;
  category: string;
  status: "Taslak" | "Yayında";
  summary: string;
  content: string;
  publishDate: string;
  slug?: string;
}

export const announcementData: Announcement[] = [];