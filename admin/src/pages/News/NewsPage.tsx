import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import NewsToolbar from "../../components/news/NewsToolbar";
import NewsTable from "../../components/news/NewsTable";
import NewsModal from "../../components/news/NewsModal";
import NewsForm, {
  type NewsFormData,
} from "../../components/news/NewsForm";

import type { News } from "../../data/newsData";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} from "../../services/newsService";

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "Tümü" | "Yayında" | "Taslak"
  >("Tümü");
  const [category, setCategory] = useState("Tümü");

  const loadNews = async () => {
    try {
      const response = await getAllNews();

      const formatted: News[] = response.map((item: any) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        content: item.content,
        category: item.category,
        status: item.is_published ? "Yayında" : "Taslak",
        author: item.author,
        publishDate: item.published_at
          ? new Date(item.published_at).toLocaleDateString("tr-TR")
          : "",
        image: item.image ?? "",
        slug: item.slug,
      }));

      setNews(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

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

  const handleSave = async (
    data: NewsFormData
  ) => {
    try {
      if (editingNews) {
        await updateNews(
          editingNews.id,
          data
        );
      } else {
        await createNews(data);
      }

      await loadNews();

      setEditingNews(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: News) => {
    setEditingNews(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Bu haberi silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;

    try {
      await deleteNews(id);
      await loadNews();
    } catch (err) {
      console.error(err);
    }
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