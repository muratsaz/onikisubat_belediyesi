import { useEffect, useMemo, useState } from "react";
import { Search, Users, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";
import api from "../../services/api";

interface CouncilMember {
  id: number;
  name: string;
  party: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = "http://localhost:8000";

const getImageUrl = (image: string | null) => {
  if (!image) {
    return "/images/default-user.png";
  }

  if (image.startsWith("http")) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${API_BASE_URL}${image}`;
  }

  return `${API_BASE_URL}/${image}`;
};

const MeclisUyeleriPage = () => {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [search, setSearch] = useState("");
  const [selectedParty, setSelectedParty] = useState("Tümü");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/council-members/");

        setMembers(response.data);
      } catch (err) {
        console.error("Meclis üyeleri alınamadı:", err);
        setError("Meclis üyeleri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const parties = useMemo(() => {
    const uniqueParties = Array.from(
      new Set(
        members
          .map((member) => member.party?.trim())
          .filter(Boolean)
      )
    );

    return ["Tümü", ...uniqueParties];
  }, [members]);

  const filteredMembers = useMemo(() => {
    const searchText = search.trim().toLocaleLowerCase("tr-TR");

    return members.filter((member) => {
      const matchesSearch =
        !searchText ||
        member.name
          .toLocaleLowerCase("tr-TR")
          .includes(searchText);

      const matchesParty =
        selectedParty === "Tümü" ||
        member.party === selectedParty;

      return matchesSearch && matchesParty;
    });
  }, [members, search, selectedParty]);

  const groupedMembers = useMemo(() => {
    return filteredMembers.reduce<
      Record<string, CouncilMember[]>
    >((groups, member) => {
      const party = member.party || "Parti Belirtilmemiş";

      if (!groups[party]) {
        groups[party] = [];
      }

      groups[party].push(member);

      return groups;
    }, {});
  }, [filteredMembers]);

  return (
    <>
      <PageHero
        title="Meclis Üyeleri"
        description="Onikişubat Belediyesi Meclis Üyeleri"
      />

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">

          {/* Üst Alan */}
          <div className="mb-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
                Meclis Üyeleri
              </h2>

              <p className="mt-2 text-slate-500">
                Onikişubat Belediye Meclisi üyelerini
                görüntüleyebilirsiniz.
              </p>
            </div>

            {/* Arama */}
            <div className="relative">
              <Search
                size={21}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Üye ara..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Parti Filtreleri */}
            <div className="mt-5 flex flex-wrap gap-3">

              {parties.map((party) => {
                const count =
                  party === "Tümü"
                    ? members.length
                    : members.filter(
                        (member) =>
                          member.party === party
                      ).length;

                const active =
                  selectedParty === party;

                return (
                  <button
                    key={party}
                    type="button"
                    onClick={() =>
                      setSelectedParty(party)
                    }
                    className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-blue-700 text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {party}
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-slate-500">
                <Loader2
                  size={28}
                  className="animate-spin"
                />

                <span>
                  Meclis üyeleri yükleniyor...
                </span>
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
              <p className="font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Sonuç Yok */}
          {!loading &&
            !error &&
            filteredMembers.length === 0 && (
              <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                <Users
                  size={48}
                  className="mx-auto mb-4 text-slate-300"
                />

                <h3 className="text-xl font-bold text-slate-700">
                  Sonuç bulunamadı
                </h3>

                <p className="mt-2 text-slate-500">
                  Arama veya parti filtresini değiştiriniz.
                </p>
              </div>
            )}

          {/* Partilere Göre Gruplar */}
          {!loading &&
            !error &&
            Object.entries(groupedMembers).map(
              ([party, partyMembers]) => (
                <div
                  key={party}
                  className="mb-12 last:mb-0"
                >
                  {/* Parti Başlığı */}
                  <div className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {party}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {partyMembers.length} Üye
                      </p>
                    </div>
                  </div>

                  {/* Üyeler */}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {partyMembers.map(
                      (member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{
                            opacity: 0,
                            y: 25,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.35,
                            delay: index * 0.04,
                          }}
                          className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                          {/* Fotoğraf */}
                          <div className="relative overflow-hidden bg-slate-100">
                            <img
                              src={getImageUrl(
                                member.image
                              )}
                              alt={member.name}
                              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                              onError={(
                                event
                              ) => {
                                event.currentTarget.src =
                                  "/images/default-user.png";
                              }}
                            />

                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>

                          {/* Bilgiler */}
                          <div className="p-5">
                            <h4 className="text-lg font-bold text-slate-800">
                              {member.name}
                            </h4>

                            <p className="mt-2 text-sm font-medium text-blue-700">
                              Meclis Üyesi
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {member.party}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
        </div>
      </section>
    </>
  );
};

export default MeclisUyeleriPage;