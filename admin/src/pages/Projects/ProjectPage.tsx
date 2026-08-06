import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import ProjectToolbar from "../../components/project/ProjectToolbar";
import ProjectTable from "../../components/project/ProjectTable";
import ProjectModal from "../../components/project/ProjectModal";
import ProjectForm,{
  type ProjectFormData,
} from "../../components/project/ProjectForm";

import type { Project } from "../../data/projectData";

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

const ProjectPage = () => {
  const [projects,setProjects]=useState<Project[]>([]);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [editingProject,setEditingProject]=useState<Project|null>(null);

  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState<
    "Tümü"|"Yayında"|"Taslak"
  >("Tümü");

  const [status,setStatus]=useState("Tümü");

  const loadProjects=async()=>{
    try{
      const response=await getAllProjects();

      const formatted:Project[]=response.map((item:any)=>({
        id:item.id,
        title:item.title,
        summary:item.summary,
        content:item.content,
        image:item.image??"",
        location:item.location,
        status:item.status,
        publishStatus:item.is_published
          ?"Yayında"
          :"Taslak",
        publishDate:item.published_at
          ?new Date(item.published_at).toLocaleDateString("tr-TR")
          :"",
      }));

      setProjects(formatted);
    }catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    loadProjects();
  },[]);

  const filteredProjects=useMemo(()=>{
    return projects.filter((item)=>{
      const searchMatch=
        item.title.toLowerCase().includes(search.toLowerCase())||
        item.summary.toLowerCase().includes(search.toLowerCase());

      const publishMatch=
        filter==="Tümü"
          ?true
          :item.publishStatus===filter;

      const statusMatch=
        status==="Tümü"
          ?true
          :item.status===status;

      return(
        searchMatch&&
        publishMatch&&
        statusMatch
      );
    });
  },[projects,search,filter,status]);

  const handleCreate=()=>{
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleSave=async(
    data:ProjectFormData
  )=>{
    try{
      if(editingProject){
        await updateProject(
          editingProject.id,
          data
        );
      }else{
        await createProject(data);
      }

      await loadProjects();

      setEditingProject(null);
      setIsModalOpen(false);
    }catch(err){
      console.error(err);
    }
  };

  const handleEdit=(item:Project)=>{
    setEditingProject(item);
    setIsModalOpen(true);
  };

  const handleDelete=async(id:number)=>{
    const confirmed=window.confirm(
      "Bu projeyi silmek istediğinize emin misiniz?"
    );

    if(!confirmed) return;

    try{
      await deleteProject(id);
      await loadProjects();
    }catch(err){
      console.error(err);
    }
  };

  const handleCloseModal=()=>{
    setEditingProject(null);
    setIsModalOpen(false);
  };

  return(
    <>
      <div className="space-y-6">
        <PageHeader
          title="Proje Yönetimi"
          description="Belediye projelerini buradan yönetebilirsiniz."
          action={
            <Button onClick={handleCreate}>
              + Yeni Proje
            </Button>
          }
        />

        <ProjectToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          status={status}
          onStatusChange={setStatus}
        />

        <ProjectTable
          projects={filteredProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ProjectModal
        open={isModalOpen}
        title={
          editingProject
            ?"Projeyi Düzenle"
            :"Yeni Proje Ekle"
        }
        onClose={handleCloseModal}
      >
        <ProjectForm
          onCancel={handleCloseModal}
          onSave={handleSave}
          initialData={editingProject}
          isEditing={editingProject!==null}
        />
      </ProjectModal>
    </>
  );
};

export default ProjectPage;