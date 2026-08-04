export interface RecentAnnouncement {
  id: number;
  title: string;
  date: string;
}

export const recentAnnouncements: RecentAnnouncement[] = [
  {
    id: 1,
    title: "Su Kesintisi Duyurusu",
    date: "04 Ağustos 2026",
  },
  {
    id: 2,
    title: "Meclis Toplantısı",
    date: "03 Ağustos 2026",
  },
  {
    id: 3,
    title: "Emlak Vergisi Son Ödeme Tarihi",
    date: "02 Ağustos 2026",
  },
];