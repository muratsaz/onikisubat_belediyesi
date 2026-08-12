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
      className="relative flex h-[260px] items-center overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Arka plan karartması */}
      <div className="absolute inset-0 bg-slate-900/75" />

      {/* İçerik */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-6">
        <div className="max-w-3xl">

          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-white/80">
            <Link
              to="/"
              className="flex items-center gap-2 transition-colors hover:text-blue-300"
            >
              <Home size={15} />
              Ana Sayfa
            </Link>

            {section && (
              <>
                <ChevronRight size={15} />

                <span>
                  {section}
                </span>
              </>
            )}

            <ChevronRight size={15} />

            <span className="font-semibold text-white">
              {title}
            </span>
          </div>

          {/* Tek başlık */}
          <h1 className="text-4xl font-black text-white lg:text-5xl">
            {title}
          </h1>

          {/* Açıklama */}
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/85">
            {description}
          </p>

        </div>
      </div>
    </section>
  );
};

export default PageHeader;