import {
  Search,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import SearchResult from "./SearchResult";
import { searchData } from "./searchData";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({
  open,
  onClose,
}: SearchModalProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return searchData
      .filter((item) => {
        const titleMatch = item.title
          .toLowerCase()
          .includes(q);

        const descriptionMatch = item.description
          .toLowerCase()
          .includes(q);

        const categoryMatch = item.category
          .toLowerCase()
          .includes(q);

        const keywordMatch = item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(q)
        );

        return (
          titleMatch ||
          descriptionMatch ||
          categoryMatch ||
          keywordMatch
        );
      })
      .sort((a, b) => {
        const getScore = (item: typeof a) => {
          let score = 0;

          if (
            item.title.toLowerCase().startsWith(q)
          )
            score += 100;

          if (
            item.title.toLowerCase().includes(q)
          )
            score += 60;

          if (
            item.keywords.some(
              (k) => k.toLowerCase() === q
            )
          )
            score += 50;

          if (
            item.keywords.some((k) =>
              k.toLowerCase().includes(q)
            )
          )
            score += 30;

          if (
            item.description
              .toLowerCase()
              .includes(q)
          )
            score += 15;

          if (
            item.category
              .toLowerCase()
              .includes(q)
          )
            score += 10;

          return score;
        };

        return getScore(b) - getScore(a);
      });
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="mt-20 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Header */}

        <div className="flex items-center gap-4 border-b border-slate-200 p-6">

          <Search
            size={24}
            className="text-slate-400"
          />

          <input
            autoFocus
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Haber, proje, ihale, müdürlük, hizmet ara..."
            className="flex-1 border-none text-lg outline-none"
          />

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Sonuçlar */}

        <div className="max-h-[60vh] overflow-y-auto p-6">

          {!query && (
            <div className="py-12 text-center text-slate-500">
              Aramak istediğiniz kelimeyi yazın.
            </div>
          )}

          {query && results.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              Sonuç bulunamadı.
            </div>
          )}

          <div className="space-y-4">

            {results.map((item) => (
              <SearchResult
                key={item.id}
                item={item}
                onClose={onClose}
              />
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default SearchModal;