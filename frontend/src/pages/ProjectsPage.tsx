import { useEffect, useMemo, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import ProjectCard from "../components/projects/ProjectCard";

import type { Project } from "../components/projects/projectData";
import { getAllProjects } from "../services/project.service";

const ITEMS_PER_PAGE = 6;

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  const [currentPage, setCurrentPage] = useState(1);

  const loadProjects = async () => {
    try {
      const response = await getAllProjects();

      const formatted: Project[] = response.map((item: any) => ({
        id: item.id,
        title: item.title,
        shortDescription: item.summary,
        description: item.content,
        category: "Proje",
        status:
          item.status === "Tamamlandı"
            ? "Tamamlandı"
            : "Devam Ediyor",
        location: item.location,
        startDate: item.published_at
          ? new Date(item.published_at).toLocaleDateString("tr-TR")
          : "-",
        endDate: "-",
        budget: "-",
        progress:
          item.status === "Tamamlandı"
            ? 100
            : item.status === "Devam Ediyor"
            ? 60
            : 10,

        coverImage: item.image
          ? `http://127.0.0.1:8000${item.image}`
          : "/images/projects/default.jpg",

        images: item.image
          ? [`http://127.0.0.1:8000${item.image}`]
          : [],
      }));

      setProjects(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (filter === "all") return true;

      if (filter === "active")
        return project.status === "Devam Ediyor";

      return project.status === "Tamamlandı";
    });
  }, [filter, projects]);

  const totalPages = Math.ceil(
    filteredProjects.length / ITEMS_PER_PAGE
  );

  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredProjects.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [currentPage, filteredProjects]);

  return (
    <>
      <PageHeader
        title="Projelerimiz"
        description="Belediyemizin devam eden ve tamamlanan projelerini inceleyebilir, proje detaylarını görüntüleyebilirsiniz."
      />

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12">
            <h1 className="text-5xl font-black text-slate-900">
              Projelerimiz
            </h1>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
              Belediyemizin devam eden ve tamamlanan projelerini
              inceleyebilir, proje detaylarını görüntüleyebilirsiniz.
            </p>
          </div>

          {/* Filtre */}

          <div className="mb-10 flex flex-wrap gap-4">
            <button
              onClick={() => {
                setFilter("all");
                setCurrentPage(1);
              }}
              className={`rounded-2xl px-6 py-3 font-semibold transition ${
                filter === "all"
                  ? "bg-blue-700 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              Tüm Projeler
            </button>

            <button
              onClick={() => {
                setFilter("active");
                setCurrentPage(1);
              }}
              className={`rounded-2xl px-6 py-3 font-semibold transition ${
                filter === "active"
                  ? "bg-blue-700 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              Devam Eden
            </button>

            <button
              onClick={() => {
                setFilter("completed");
                setCurrentPage(1);
              }}
              className={`rounded-2xl px-6 py-3 font-semibold transition ${
                filter === "completed"
                  ? "bg-blue-700 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              Tamamlanan
            </button>
          </div>

          {/* Kartlar */}

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>

          {/* Sayfalama */}

          <div className="mt-14 flex items-center justify-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-xl border border-slate-300 px-5 py-2 font-semibold disabled:opacity-50"
            >
              Önceki
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-11 w-11 rounded-xl ${
                    currentPage === page
                      ? "bg-blue-700 text-white"
                      : "border border-slate-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-xl border border-slate-300 px-5 py-2 font-semibold disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;