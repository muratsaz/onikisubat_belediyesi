import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import TenderToolbar from "../../components/tender/TenderToolbar";
import TenderTable from "../../components/tender/TenderTable";
import TenderModal from "../../components/tender/TenderModal";
import TenderForm, {
  type TenderFormData,
} from "../../components/tender/TenderForm";

import type { Tender } from "../../services/tenderService";

import {
  getAllTenders,
  createTender,
  updateTender,
  deleteTender,
} from "../../services/tenderService";

const TenderPage = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTender, setEditingTender] =
    useState<Tender | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Tümü");

  const loadTenders = async () => {
    try {
      const response = await getAllTenders();
      setTenders(response);
    } catch (err) {
      console.error("İhaleler yüklenemedi:", err);
    }
  };

  useEffect(() => {
    loadTenders();
  }, []);

  const filteredTenders = useMemo(() => {
    return tenders.filter((item) => {
      const searchValue = search.toLowerCase();

      const searchMatch =
        item.title.toLowerCase().includes(searchValue) ||
        item.tender_number
          .toLowerCase()
          .includes(searchValue);

      const statusMatch =
        status === "Tümü"
          ? true
          : item.status.toUpperCase() === status;

      return searchMatch && statusMatch;
    });
  }, [tenders, search, status]);

  const handleCreate = () => {
    setEditingTender(null);
    setIsModalOpen(true);
  };

  const handleSave = async (data: TenderFormData) => {
    try {
      if (editingTender) {
        await updateTender(editingTender.id, data);
      } else {
        await createTender(data);
      }

      await loadTenders();

      setEditingTender(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("İhale kaydedilemedi:", err);
      alert("İhale kaydedilirken bir hata oluştu.");
    }
  };

  const handleEdit = (item: Tender) => {
    setEditingTender(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu ihaleyi silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;

    try {
      await deleteTender(id);
      await loadTenders();
    } catch (err) {
      console.error("İhale silinemedi:", err);
      alert("İhale silinirken bir hata oluştu.");
    }
  };

  const handleCloseModal = () => {
    setEditingTender(null);
    setIsModalOpen(false);
  };

  const formInitialData: TenderFormData | null =
    editingTender
      ? {
          title: editingTender.title,
          tenderNumber:
            editingTender.tender_number,
          description:
            editingTender.description ?? "",
          publishDate:
            editingTender.publish_date,
          deadline:
            editingTender.deadline,
          status: editingTender.status,
        }
      : null;

  return (
    <>
      <PageHeader
        title="İhale Yönetimi"
        description="Belediye ihalelerini buradan yönetebilirsiniz."
        action={
          <Button onClick={handleCreate}>
            + Yeni İhale
          </Button>
        }
      />

      <TenderToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <TenderTable
        tenders={filteredTenders}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TenderModal
        open={isModalOpen}
        title={
          editingTender
            ? "İhaleyi Düzenle"
            : "Yeni İhale Ekle"
        }
        onClose={handleCloseModal}
      >
        <TenderForm
          onCancel={handleCloseModal}
          onSave={handleSave}
          initialData={formInitialData}
          isEditing={editingTender !== null}
        />
      </TenderModal>
    </>
  );
};

export default TenderPage;