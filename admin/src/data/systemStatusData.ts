export interface SystemStatus {
  id: number;
  title: string;
  value: string;
  success: boolean;
}

export const systemStatus: SystemStatus[] = [
  {
    id: 1,
    title: "API",
    value: "Çalışıyor",
    success: true,
  },
  {
    id: 2,
    title: "Veritabanı",
    value: "Bağlı",
    success: true,
  },
  {
    id: 3,
    title: "Dosya Depolama",
    value: "Aktif",
    success: true,
  },
  {
    id: 4,
    title: "Son Yedek",
    value: "Bugün",
    success: true,
  },
];