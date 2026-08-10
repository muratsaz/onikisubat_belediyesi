import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  FolderOpen,
  CircleCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAllProjects, getProject } from "../services/project.service";

interface ApiProject {
  id: number;
  title: string;
  summary: string;
  content: string;
  image?: string | null;
  location?: string | null;
  status?: string | null;
  publishStatus?: string | null;
  publishDate?: string | null;
  published_at?: string | null;
}

const API_URL = "http://127.0.0.1:8000";

const getImageUrl = (image?: string | null) => {
  if (!image) {
    return "/images/projects/default.jpg";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_URL}${image}`;
};

const formatDate = (date?: string | null) => {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("tr-TR");
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<ApiProject | null>(null);
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const projectId = Number(id);

        if (Number.isNaN(projectId)) {
          setError(true);
          return;
        }

        const [projectResponse, projectsResponse] = await Promise.all([
          getProject(projectId),
          getAllProjects(),
        ]);

        setProject(projectResponse);
        setProjects(projectsResponse);
      } catch (err) {
        console.error("Proje detayı yüklenemedi:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-lg text-slate-600">
            Proje yükleniyor...
          </p>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-black text-slate-900">
            Proje Bulunamadı
          </h1>

          <Link
            to="/projeler"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            <ArrowLeft size={18} />
            Projelere Dön
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = projects.findIndex(
    (item) => Number(item.id) === Number(project.id)
  );

  const previousProject =
    currentIndex > 0 ? projects[currentIndex - 1] : null;

  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  const publishDate =
    project.publishDate ?? project.published_at ?? null;

  const imageUrl = getImageUrl(project.image);

  return (
    <>
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            to="/projeler"
            className="mb-10 inline-flex items-center gap-2 text-blue-700 hover:underline"
          >
            <ArrowLeft size={18} />
            Tüm Projelere Dön
          </Link>

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            {/* SOL TARAF */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={imageUrl}
                alt={project.title}
                className="h-[520px] w-full rounded-3xl object-cover shadow-xl"
              />

              <h1 className="mt-10 text-5xl font-black text-slate-900">
                {project.title}
              </h1>

              {project.summary && (
                <p className="mt-8 text-lg leading-9 text-slate-600">
                  {project.summary}
                </p>
              )}

              {project.content && (
                <div className="mt-8 text-lg leading-9 text-slate-600">
                  {project.content}
                </div>
              )}
            </motion.div>

            {/* SAĞ TARAF */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-8 text-2xl font-bold">
                  Proje Bilgileri
                </h2>

                <div className="space-y-6">
                  {/* Durum */}
                  <div className="flex items-start gap-4">
                    <CircleCheck className="mt-1 text-blue-700" />

                    <div>
                      <p className="font-semibold">
                        Proje Durumu
                      </p>

                      <p className="text-slate-600">
                        {project.status || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Konum */}
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 text-blue-700" />

                    <div>
                      <p className="font-semibold">
                        Konum
                      </p>

                      <p className="text-slate-600">
                        {project.location || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Yayın Tarihi */}
                  <div className="flex items-start gap-4">
                    <CalendarDays className="mt-1 text-blue-700" />

                    <div>
                      <p className="font-semibold">
                        Yayın Tarihi
                      </p>

                      <p className="text-slate-600">
                        {formatDate(publishDate)}
                      </p>
                    </div>
                  </div>

                  {/* Yayın Durumu */}
                  <div className="flex items-start gap-4">
                    <FolderOpen className="mt-1 text-blue-700" />

                    <div>
                      <p className="font-semibold">
                        Yayın Durumu
                      </p>

                      <p className="text-slate-600">
                        {project.publishStatus || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Galeri */}
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-8 text-2xl font-bold">
                  Proje Galerisi
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  {project.image ? (
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={imageUrl}
                      alt={`${project.title} Görseli`}
                      className="h-56 w-full cursor-pointer rounded-2xl object-cover shadow-md"
                    />
                  ) : (
                    <div className="rounded-2xl bg-slate-100 p-6 text-center text-slate-500">
                      Proje görseli bulunmuyor.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ÖNCEKİ / SONRAKİ */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {previousProject ? (
              <button
                onClick={() =>
                  navigate(`/projeler/${previousProject.id}`)
                }
                className="group flex items-center justify-between rounded-3xl bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <p className="mb-2 text-sm text-slate-500">
                    Önceki Proje
                  </p>

                  <h3 className="text-2xl font-bold transition group-hover:text-blue-700">
                    {previousProject.title}
                  </h3>
                </div>

                <ArrowLeft
                  size={34}
                  className="text-blue-700"
                />
              </button>
            ) : (
              <div />
            )}

            {nextProject ? (
              <button
                onClick={() =>
                  navigate(`/projeler/${nextProject.id}`)
                }
                className="group flex items-center justify-between rounded-3xl bg-white p-8 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ArrowRight
                  size={34}
                  className="text-blue-700"
                />

                <div>
                  <p className="mb-2 text-sm text-slate-500">
                    Sonraki Proje
                  </p>

                  <h3 className="text-2xl font-bold transition group-hover:text-blue-700">
                    {nextProject.title}
                  </h3>
                </div>
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetailPage;