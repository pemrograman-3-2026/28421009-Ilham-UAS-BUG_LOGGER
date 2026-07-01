"use client";
import { showToast } from "@/components/toast/toast";
import api from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IProjects } from "@/components/User-component/dashboard-user"; // sesuaikan path

export default function EditBug() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [projectId, setProjectId] = useState<number>(0);
  const [projects, setProjects] = useState<IProjects[]>([]);

  const getProjects = async () => {
    try {
      const res = await api.get("/api-uts/projects");
      setProjects(res.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const getBugDetail = async () => {
    try {
      const res = await api.get(`/api-uts/buglogs/${id}`);
      const bug = res.data.data;
      // console.log("Bug detail:", bug);
      setName(bug.name);
      setDescription(bug.description);
      setStatus(bug.status);
      setPriority(bug.priority);
      setProjectId(bug.projectId);
    } catch (error) {
      console.error("Error fetching bug detail:", error);
    }
  };

  useEffect(() => {
    getProjects();
    getBugDetail();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api-uts/buglogs/${id}`, {
        name,
        description,
        status,
        priority,
        projectId,
      });
      showToast(res.data.message, "success");
      router.push("/user/bug");
    } catch (error) {
      showToast("Gagal mengupdate laporan bug", "danger");
      console.error("Error updating bug:", error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Edit Laporan Bug</h4>
        <Link href="/user/bug">
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Pilih Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Prioritas</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Pilih Prioritas</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Project</label>
              <select
                className="form-select"
                value={projectId}
                onChange={(e) => setProjectId(Number(e.target.value))}
              >
                <option value="">Pilih Project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
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