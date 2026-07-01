"use client";
import { showToast } from "@/components/toast/toast";
import api from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IProjects } from "@/components/User-component/dashboard-user"; 
import { ICookieUser } from "@/components/User-component/buglogs-user"; 

export default function AddBug() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [projectId, setProjectId] = useState<number>(0);
  const [projects, setProjects] = useState<IProjects[]>([]);
  const [userId, setUserId] = useState<number>(0);
//   const [userName, setUserName] = useState<string>("");

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const getProjects = async () => {
    try {
      const res = await api.get("/api-uts/projects");
      setProjects(res.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();

    const userCookie = getCookie("user");
    if (userCookie) {
      const user: ICookieUser = JSON.parse(userCookie);
      setUserId(user.id);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/api-uts/buglogs", {
        name,
        description,
        status,
        priority,
        projectId,
        userId,
      });
      showToast(res.data.message, "success");
      router.push("/user/bug");
    } catch (error) {
      showToast("Gagal menambahkan laporan bug", "danger");
      console.error("Error adding bug:", error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Tambah Laporan Bug</h4>
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