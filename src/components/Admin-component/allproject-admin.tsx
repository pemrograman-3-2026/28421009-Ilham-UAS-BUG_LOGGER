"use client";
import api, { baseURL } from "@/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { showToast } from "@/components/toast/toast";
import {  Trash } from "lucide-react";

interface Iprojects {
  id: string | number;
  name: string;
  description: string;
  stack: string;
}

export default function AllProjects() {
  const [projects, setProjects] = useState<Iprojects[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {

      const res = await api.get(`/api-uts/projects`);
      setProjects(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const deleteProject = async (id: number) => {
    const isAgree = confirm("Apakah anda yakin ingin menghapus projek ini?");
    if (isAgree) {
      try {
        const res = await api.delete(`/api-uts/projects/${id}`);
        showToast(res.data.message, "success");
        getData();
      } catch (error: any) {
        showToast("Gagal menghapus projek", "danger");
        console.error("Error deleting project:", error);
      }
    }
  };



  return (
    <div className="row">
      <div className="col-lg-6 col-md-4">
        <h1 className="mb-4">Projek Terdaftar</h1>
        
      </div>
       <Link href="/admin/projects/add">
          <button className="btn btn-sm btn-primary" type="button">
            Tambah Projek
          </button>
        </Link>
    
      <div className="row g-4 mt-2">
        {projects.map((projects) => (
          <div key={projects.id} className="col-lg-4 col-md-6">
            <div className="card bg-white border-0 shadow-sm">
              <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold text-dark mb-2 text-capitalize">
                  {projects.name}
                </h5>
                <p className="card-text text-muted small mb-4 flex-grow-1">
                  {projects.description}
                </p>

                <div className="d-flex gap-2 mb-3">
                  <span className="badge bg-warning-subtle text-warning border border-warning-subtle text-uppercase">
                    {projects.stack}
                  </span>
                
                </div>

                

                <div className="d-flex gap-2 mt-auto">
                  <Link href={`/admin/projects/add/edit/${projects.id}`} className="flex-grow-1">
                    <button className="btn btn-sm btn-primary w-100" type="button">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProject(projects.id)}
                    className="btn btn-sm btn-danger flex-grow-1"
                    type="button"
                  >
                    <Trash />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}