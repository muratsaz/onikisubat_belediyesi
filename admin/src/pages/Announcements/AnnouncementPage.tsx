import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import AnnouncementToolbar from "../../components/announcement/AnnouncementToolbar";
import AnnouncementTable from "../../components/announcement/AnnouncementTable";
import AnnouncementModal from "../../components/announcement/AnnouncementModal";
import AnnouncementForm, {
  type AnnouncementFormData,
} from "../../components/announcement/AnnouncementForm";

import type { Announcement } from "../../data/announcementData";

import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../services/announcementService";

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Tümü" | "Yayında" | "Taslak">("Tümü");
  const [category, setCategory] = useState("Tümü");

  const loadAnnouncements = async () => {
    try {
      const response = await getAllAnnouncements();

      const formatted: Announcement[] = response.map((item: any) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        content: item.content,
        category: item.category,
        status: item.is_published ? "Yayında" : "Taslak",
        publishDate: item.published_at
          ? new Date(item.published_at).toLocaleDateString("tr-TR")
          : "",
      }));

      setAnnouncements(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const searchMatch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        filter === "Tümü" ? true : item.status === filter;

      const categoryMatch =
        category === "Tümü" ? true : item.category === category;

      return searchMatch && statusMatch && categoryMatch;
    });
  }, [announcements, search, filter, category]);

  const handleCreate = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleSave = async (data: AnnouncementFormData) => {
    try {
      if (editingAnnouncement) {
        await updateAnnouncement(editingAnnouncement.id, data);
      } else {
        await createAnnouncement(data);
      }

      await loadAnnouncements();

      setEditingAnnouncement(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: Announcement) => {
    setEditingAnnouncement(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu duyuruyu silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;

    try {
      await deleteAnnouncement(id);
      await loadAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Duyuru Yönetimi"
          description="Belediye duyurularını buradan yönetebilirsiniz."
          action={
            <Button onClick={handleCreate}>
              + Yeni Duyuru
            </Button>
          }
        />

        <AnnouncementToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          category={category}
          onCategoryChange={setCategory}
        />

        <AnnouncementTable
          announcements={filteredAnnouncements}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AnnouncementModal
        open={isModalOpen}
        title={
          editingAnnouncement
            ? "Duyuruyu Düzenle"
            : "Yeni Duyuru Ekle"
        }
        onClose={handleCloseModal}
      >
        <AnnouncementForm
          onCancel={handleCloseModal}
          onSave={handleSave}
          initialData={editingAnnouncement}
          isEditing={editingAnnouncement !== null}
        />
      </AnnouncementModal>
    </>
  );
};

export default AnnouncementPage;