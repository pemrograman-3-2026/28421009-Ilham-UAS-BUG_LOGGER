"use client";
import { showToast } from "@/components/toast/toast";
import api from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProjects() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");

  const getProjectsDetail = async () => {
    try {
      const res = await api.get(`/api-uts/projects/${id}`);
      const project = res.data.data;
      // console.log("Project detail:", project);
      setName(project.name);
      setDescription(project.description);
      setStack(project.stack);
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };


  useEffect(() => {
    getProjectsDetail();
    // getBugDetail();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api-uts/projects/${id}`, {
        name,
        description,
        stack,
      });
      showToast(res.data.message, "success");
      router.push("/admin/projects/add/all");
    } catch (error) {
      showToast("Gagal mengupdate laporan bug", "danger");
      console.error("Error updating bug:", error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Edit Laporan Bug</h4>
        <Link href="/admin/projects/add/all">
          <button className="btn btn-sm btn-primary" type="button">
            Kembali
          </button>
        </Link>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama Bug</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <textarea
                className="form-control"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
              >
                <option value="">Pilih Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}