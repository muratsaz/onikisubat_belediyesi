import { ArrowRight, MapPin, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import type { Project } from "./projectData";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
    >
      {/* Fotoğraf */}
      <div className="overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      {/* İçerik */}
      <div className="p-5">

        <div className="mb-4 flex items-center justify-between">

          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${
              project.status === "Devam Ediyor"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {project.status}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
            {project.category}
          </span>

        </div>

        <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-blue-700">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {project.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-500">

          <div className="flex items-center gap-2">
            <MapPin size={15} />
            {project.location}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={15} />
            {project.startDate}
          </div>

        </div>

        {/* İlerleme */}
        <div className="mt-5">

          <div className="mb-2 flex justify-between text-xs font-semibold">
            <span>İlerleme</span>
            <span>%{project.progress}</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-700 transition-all duration-500"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>

        </div>

        <Link
          to={`/projeler/${project.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition group-hover:gap-3"
        >
          Projeyi İncele
          <ArrowRight size={16} />
        </Link>

      </div>
    </motion.div>
  );
};

export default ProjectCard;