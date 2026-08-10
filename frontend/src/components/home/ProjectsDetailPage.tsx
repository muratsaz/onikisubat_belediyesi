import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Wallet,
  FolderOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";

// 1. ÇÖZÜM: Dosya yolları bir üst dizine daha çıkacak şekilde (../../) güncellendi
import PageHeader from "../common/PageHeader";
import { projectData } from "../projects/projectData";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. ÇÖZÜM: TypeScript için 'project' değişkenine tip atandı
  const currentIndex = projectData.findIndex(
    (project: any) => String(project.id) === String(id)
  );

  const project = projectData[currentIndex];

  if (!project) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-4xl font-black">Proje Bulunamadı</h2>
        <Link
          to="/projeler"
          className="mt-8 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white"
        >
          Projelere Dön
        </Link>
      </section>
    );
  }

  const previousProject =
    currentIndex > 0 ? projectData[currentIndex - 1] : null;

  const nextProject =
    currentIndex < projectData.length - 1 ? projectData[currentIndex + 1] : null;

  return (
    <>
      <PageHeader
        title={project.title}
        section="Projeler"
        description={project.shortDescription}
      />

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
                src={project.coverImage}
                alt={project.title}
                className="h-[520px] w-full rounded-3xl object-cover shadow-xl"
              />

              <h1 className="mt-10 text-5xl font-black text-slate-900">
                {project.title}
              </h1>

              <p className="mt-8 text-lg leading-9 text-slate-600">
                {project.description}
              </p>
            </motion.div>

            {/* SAĞ TARAF */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-8 text-2xl font-bold">Proje Bilgileri</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FolderOpen className="mt-1 text-blue-700" />
                    <div>
                      <p className="font-semibold">Kategori</p>
                      <p className="text-slate-600">{project.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 text-blue-700" />
                    <div>
                      <p className="font-semibold">Konum</p>
                      <p className="text-slate-600">{project.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CalendarDays className="mt-1 text-blue-700" />
                    <div>
                      <p className="font-semibold">Başlangıç</p>
                      <p className="text-slate-600">{project.startDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CalendarDays className="mt-1 text-blue-700" />
                    <div>
                      <p className="font-semibold">Bitiş</p>
                      <p className="text-slate-600">{project.endDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Wallet className="mt-1 text-blue-700" />
                    <div>
                      <p className="font-semibold">Proje Bütçesi</p>
                      <p className="text-slate-600">{project.budget}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="mb-3 flex justify-between">
                    <span className="font-semibold">İlerleme</span>
                    <span className="font-bold text-blue-700">
                      %{project.progress}
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-200">
                    <div
                      className="h-3 rounded-full bg-blue-700 transition-all duration-700"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Galeri */}
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-8 text-2xl font-bold">Proje Galerisi</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* 3. ÇÖZÜM: TypeScript için 'image' (string) ve 'index' (number) tipleri eklendi */}
                  {project.images?.map((image: string, index: number) => (
                    <motion.img
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={image}
                      alt={`${project.title} Görseli ${index + 1}`}
                      className="h-56 w-full cursor-pointer rounded-2xl object-cover shadow-md"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Önceki / Sonraki */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {previousProject ? (
              <button
                onClick={() => navigate(`/projeler/${previousProject.id}`)}
                className="group flex items-center justify-between rounded-3xl bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <p className="mb-2 text-sm text-slate-500">Önceki Proje</p>
                  <h3 className="text-2xl font-bold transition group-hover:text-blue-700">
                    {previousProject.title}
                  </h3>
                </div>
                <ArrowLeft size={34} className="text-blue-700" />
              </button>
            ) : (
              <div />
            )}

            {nextProject ? (
              <button
                onClick={() => navigate(`/projeler/${nextProject.id}`)}
                className="group flex items-center justify-between rounded-3xl bg-white p-8 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ArrowRight size={34} className="text-blue-700" />
                <div>
                  <p className="mb-2 text-sm text-slate-500">Sonraki Proje</p>
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