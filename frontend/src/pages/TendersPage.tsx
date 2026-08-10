import { useEffect, useMemo, useState } from "react";

import TenderSearch from "../components/ihaleler/TenderSearch";
import TenderSidebar from "../components/ihaleler/TenderSidebar";
import TenderStats from "../components/ihaleler/TenderStats";
import TenderTable, {
  type Tender as TableTender,
} from "../components/ihaleler/TenderTable";

import {
  getAllTenders,
  getTenderDocuments,
} from "../services/tender.service";

const ITEMS_PER_PAGE = 5;

const TendersPage = () => {
  const [tenders, setTenders] = useState<TableTender[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "open" | "closed"
  >("all");

  const loadTenders = async () => {
    try {
      const response = await getAllTenders();

      const formatted: TableTender[] = await Promise.all(
        response.map(async (item) => {
          let pdf = "";

          try {
            const documents = await getTenderDocuments(
              item.id
            );

            if (documents.length > 0) {
              pdf = `http://127.0.0.1:8000${documents[0].file_path}`;
            }
          } catch (error) {
            console.error(
              `İhale ${item.id} belgeleri alınamadı:`,
              error
            );
          }

          return {
            id: item.id,
            title: item.title,
            department: "-",
            publishDate: new Date(
              item.publish_date
            ).toLocaleDateString("tr-TR"),
            deadline: new Date(
              item.deadline
            ).toLocaleDateString("tr-TR"),
            status:
              item.status === "ACTIVE"
                ? "Açık"
                : "Sonuçlandı",
            tenderNo: item.tender_number,
            method: "-",
            budget: "-",
            location: "-",
            description: item.description ?? "",
            pdf,
          };
        })
      );

      setTenders(formatted);
    } catch (error) {
      console.error("İhaleler yüklenemedi:", error);
    }
  };

  useEffect(() => {
    loadTenders();
  }, []);

  const filteredTenders = useMemo(() => {
    return tenders.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.department
          .toLowerCase()
          .includes(searchValue) ||
        item.tenderNo
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "open"
          ? item.status === "Açık"
          : item.status === "Sonuçlandı";

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, tenders]);

  const openCount = tenders.filter(
    (item) => item.status === "Açık"
  ).length;

  const closedCount = tenders.filter(
    (item) => item.status === "Sonuçlandı"
  ).length;

  const totalPages = Math.ceil(
    filteredTenders.length / ITEMS_PER_PAGE
  );

  const currentTenders = useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredTenders.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [currentPage, filteredTenders]);

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="self-start">
              <TenderSidebar
                filter={filter}
                setFilter={(value) => {
                  setFilter(value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div>
              <div className="mb-8">
                <h1 className="text-5xl font-black text-slate-900">
                  İhale İlanları
                </h1>

                <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
                  Belediyemize ait açık ve sonuçlanan
                  ihale ilanlarını inceleyebilir,
                  şartname dosyalarını görüntüleyebilir
                  ve ihale detaylarına ulaşabilirsiniz.
                </p>
              </div>

              <TenderSearch
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />

              <TenderStats
                total={tenders.length}
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
                <TenderTable
                  tenders={currentTenders}
                />
              </div>

              {totalPages > 0 && (
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

                  {Array.from({
                    length: totalPages,
                  }).map((_, index) => {
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
                  })}

                  <button
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      setCurrentPage((p) => p + 1)
                    }
                    className="rounded-xl border border-slate-300 px-5 py-2 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Sonraki
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TendersPage;