import { useMemo, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import TenderSearch from "../components/ihaleler/TenderSearch";
import TenderSidebar from "../components/ihaleler/TenderSidebar";
import TenderStats from "../components/ihaleler/TenderStats";
import TenderTable from "../components/ihaleler/TenderTable";

import { tenderData } from "../components/ihaleler/tenderData";

const ITEMS_PER_PAGE = 5;

const TendersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sonraki adımda kullanılacak
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "open" | "closed"
  >("all");

  const filteredTenders = useMemo(() => {
    return tenderData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.department
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "open"
          ? item.status === "Açık"
          : item.status === "Sonuçlandı";

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const openCount = tenderData.filter(
    (item) => item.status === "Açık"
  ).length;

  const closedCount = tenderData.filter(
    (item) => item.status === "Sonuçlandı"
  ).length;

  const totalPages = Math.ceil(
    filteredTenders.length / ITEMS_PER_PAGE
  );

  const currentTenders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredTenders.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [currentPage, filteredTenders]);

  return (
    <>
      <PageHeader
        title="İhaleler"
        section="Hızlı Erişim"
        description="Belediyemize ait açık ve sonuçlanan ihale ilanlarını inceleyebilir, şartnameleri görüntüleyebilir ve ihale detaylarına ulaşabilirsiniz."
      />

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="self-start">
              <TenderSidebar
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div>
              <div className="mb-8">
                <h1 className="text-5xl font-black text-slate-900">
                  İhale İlanları
                </h1>

                <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
                  Belediyemize ait açık ve sonuçlanan ihale
                  ilanlarını inceleyebilir, şartname dosyalarını
                  görüntüleyebilir ve ihale detaylarına
                  ulaşabilirsiniz.
                </p>
              </div>

              <TenderSearch
                value={search}
                onChange={setSearch}
              />

              <TenderStats
                total={tenderData.length}
                open={openCount}
                closed={closedCount}
              />

              <div className="mt-10 flex items-center justify-between">
                <p className="text-lg text-slate-600">
                  Toplam{" "}
                  <span className="font-bold text-blue-700">
                    {filteredTenders.length}
                  </span>{" "}
                  ihale bulundu.
                </p>
              </div>

              <div className="mt-6">
                <TenderTable tenders={currentTenders} />
              </div>

              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((p) => p - 1)
                  }
                  className="rounded-xl border border-slate-300 px-5 py-2 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Önceki
                </button>

                {Array.from({ length: totalPages }).map(
                  (_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`h-11 w-11 rounded-xl font-semibold transition ${
                          currentPage === page
                            ? "bg-blue-700 text-white"
                            : "border border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}

                <button
                  disabled={
                    currentPage === totalPages ||
                    totalPages === 0
                  }
                  onClick={() =>
                    setCurrentPage((p) => p + 1)
                  }
                  className="rounded-xl border border-slate-300 px-5 py-2 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Sonraki
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TendersPage;