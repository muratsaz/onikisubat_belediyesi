import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description: string;
  image?: string;
  section?: string;
}

const PageHeader = ({
  title,
  description,
  image = "/images/municipality/belediye1.jpeg",
  section,
}: PageHeaderProps) => {
  return (
    <section
      className="relative flex h-[360px] items-center overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/70" />

      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-6">
        <div className="max-w-3xl">

          <div className="mb-6 flex items-center gap-2 text-sm text-white/90">

            <Link
              to="/"
              className="flex items-center gap-2 hover:text-blue-300"
            >
              <Home size={16} />
              Ana Sayfa
            </Link>

            {section && (
              <>
                <ChevronRight size={16} />
                <span>{section}</span>
              </>
            )}

            <ChevronRight size={16} />

            <span className="font-semibold">
              {title}
            </span>

          </div>

          <h1 className="text-5xl font-black text-white lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
            {description}
          </p>

        </div>
      </div>
    </section>
  );
};

export default PageHeader;