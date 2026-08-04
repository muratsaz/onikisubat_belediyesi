import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import NewsToolbar from "../../components/news/NewsToolbar";
import NewsTable from "../../components/news/NewsTable";
import NewsModal from "../../components/news/NewsModal";
import NewsForm, {
  type NewsFormData,
} from "../../components/news/NewsForm";

import { newsData, type News } from "../../data/newsData";

const NewsPage = () => {
  const [news, setNews] = useState<News[]>(newsData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingNews, setEditingNews] = useState<News | null>(null);

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
                title: data.title,
                category: data.category,
                status: data.status,
              }
            : item
        )
      );
    } else {
      const newNews: News = {
        id:
          news.length > 0
            ? Math.max(...news.map((item) => item.id)) + 1
            : 1,
        title: data.title,
        category: data.category,
        status: data.status,
        author: "Admin",
        publishDate: new Date().toLocaleDateString("tr-TR"),
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

    setNews((prev) => prev.filter((item) => item.id !== id));
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

        <NewsToolbar />

        <NewsTable
          news={news}
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