import {
  CreditCard,
  FileText,
  Landmark,
  Building2,
  Map,
  FileCheck,
  HeartHandshake,
  ScrollText,
  Newspaper,
  Bell,
  Users,
  ShieldCheck,
} from "lucide-react";

export interface EService {
  id: number;
  title: string;
  description: string;
  icon: typeof CreditCard;
  color: string;
  path: string;
  external?: boolean;
}

export const services: EService[] = [
  {
    id: 1,
    title: "Vergi Borcu Sorgulama",
    description: "Emlak Vergisi, ÇTV ve diğer belediye borçlarını görüntüleyin.",
    icon: CreditCard,
    color: "bg-blue-100 text-blue-700",
    path: "#",
  },
  {
    id: 2,
    title: "Online Ödeme",
    description: "Belediye ödemelerinizi güvenli şekilde gerçekleştirin.",
    icon: Landmark,
    color: "bg-emerald-100 text-emerald-700",
    path: "#",
  },
  {
    id: 3,
    title: "Sicil Bilgileri",
    description: "Mükellef bilgilerinizi görüntüleyin.",
    icon: Users,
    color: "bg-violet-100 text-violet-700",
    path: "#",
  },
  {
    id: 4,
    title: "İmar Durumu",
    description: "Parsel ve imar durumunu sorgulayın.",
    icon: Building2,
    color: "bg-orange-100 text-orange-700",
    path: "#",
  },
  {
    id: 5,
    title: "Rayiç Değer",
    description: "Arsa ve bina rayiç değerlerini inceleyin.",
    icon: Map,
    color: "bg-cyan-100 text-cyan-700",
    path: "#",
  },
  {
    id: 6,
    title: "Evrak Doğrulama",
    description: "QR veya belge numarası ile doğrulama yapın.",
    icon: FileCheck,
    color: "bg-teal-100 text-teal-700",
    path: "#",
  },
  {
    id: 7,
    title: "Beyaz Masa",
    description: "Talep, öneri ve şikayet oluşturun.",
    icon: HeartHandshake,
    color: "bg-pink-100 text-pink-700",
    path: "#",
  },
  {
    id: 8,
    title: "Nikah Başvurusu",
    description: "Nikah ön başvurusunu online oluşturun.",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-700",
    path: "#",
  },
  {
    id: 9,
    title: "İhale İlanları",
    description: "Güncel ihale ilanlarını görüntüleyin.",
    icon: ScrollText,
    color: "bg-yellow-100 text-yellow-700",
    path: "/ihaleler",
  },
  {
    id: 10,
    title: "Haberler",
    description: "Belediyemizden son gelişmeleri takip edin.",
    icon: Newspaper,
    color: "bg-indigo-100 text-indigo-700",
    path: "/haberler",
  },
  {
    id: 11,
    title: "Duyurular",
    description: "Resmi duyuru ve ilanları inceleyin.",
    icon: Bell,
    color: "bg-lime-100 text-lime-700",
    path: "/duyurular",
  },
  {
    id: 12,
    title: "Ruhsat Başvuruları",
    description: "İşyeri ve yapı ruhsat işlemlerini başlatın.",
    icon: FileText,
    color: "bg-slate-100 text-slate-700",
    path: "#",
  },
];