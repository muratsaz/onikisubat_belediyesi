import { useMemo, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import NewsToolbar from "../../components/news/NewsToolbar";
import NewsTable from "../../components/news/NewsTable";
import NewsModal from "../../components/news/NewsModal";
import NewsForm, {
  type NewsFormData,
} from "../../components/news/NewsForm";

import { newsData, type News } from "../../data/newsData";

const createSlug = (text: string) =>
  text
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const NewsPage = () => {
  const [news, setNews] = useState<News[]>(newsData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingNews, setEditingNews] =
    useState<News | null>(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "Tümü" | "Yayında" | "Taslak"
  >("Tümü");

  const [category, setCategory] = useState("Tümü");

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const searchMatch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.summary
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        filter === "Tümü"
          ? true
          : item.status === filter;

      const categoryMatch =
        category === "Tümü"
          ? true
          : item.category === category;

      return (
        searchMatch &&
        statusMatch &&
        categoryMatch
      );
    });
  }, [news, search, filter, category]);

  const handleCreate = () => {
    setEditingNews(null);
    setIsModalOpen(true);
  };

  const handleSave = (data: NewsFormData) => {
    if (editingNews) {
      setNews((prev) =>
        prev.map((item) =>
          item.id === editingNews.id
            ? {
                ...item,
                ...data,
                image: data.image,
                slug: createSlug(data.title),
              }
            : item
        )
      );
    } else {
      const newNews: News = {
        id:
          news.length > 0
            ? Math.max(...news.map((n) => n.id)) + 1
            : 1,

        title: data.title,
        summary: data.summary,
        content: data.content,
        category: data.category,
        status: data.status,
        author: data.author,
        publishDate: data.publishDate,
        image: data.image,
        slug: createSlug(data.title),
      };

      setNews((prev) => [newNews, ...prev]);
    }

    setEditingNews(null);
    setIsModalOpen(false);
  };

  const handleEdit = (item: News) => {
    setEditingNews(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Bu haberi silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;

    setNews((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleCloseModal = () => {
    setEditingNews(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Haber Yönetimi"
          description="Belediye haberlerini buradan yönetebilirsiniz."
          action={
            <Button onClick={handleCreate}>
              + Yeni Haber
            </Button>
          }
        />

        <NewsToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          category={category}
          onCategoryChange={setCategory}
        />

        <NewsTable
          news={filteredNews}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <NewsModal
        open={isModalOpen}
        title={
          editingNews
            ? "Haberi Düzenle"
            : "Yeni Haber Ekle"
        }
        onClose={handleCloseModal}
      >
        <NewsForm
          onCancel={handleCloseModal}
          onSave={handleSave}
          initialData={editingNews}
          isEditing={editingNews !== null}
        />
      </NewsModal>
    </>
  );
};

export default NewsPage; 