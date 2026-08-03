import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projectData } from "../projects/projectData";
import ProjectCard from "../projects/ProjectCard";

const ProjectsSection = () => {
  const featuredProjects = projectData.slice(0, 3);

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[4px] text-blue-600">Projeler</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Belediyemizin öncelikli projeleri</h2>
          </div>
          <Link to="/projeler" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
            Tüm projeleri gör <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={() => undefined} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
