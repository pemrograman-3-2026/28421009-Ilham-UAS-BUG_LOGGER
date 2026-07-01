"use client";
import api, { baseURL } from "@/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { showToast } from "@/components/toast/toast";
import {  Trash } from "lucide-react";

interface IBugs {
  id: string | number;
  name: string;
  description: string;
  status: string;
  priority: string;
  userId: string | number;
  projectId: string | number;
  user: {
    name: string;
    email: string;
  };
  project: {
    name: string;
    stack: string;
  };
}

export interface ICookieUser {
  id: number;
  name: string;
  role: string;
}

export default function BugS() {
  const [bugs, setBugs] = useState<IBugs[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getData();
  }, []);

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const getData = async () => {
    try {
      const userCookie = getCookie("user");
      if (!userCookie) {
        console.error("Cookie user tidak ditemukan");
        return;
      }

      const user: ICookieUser = JSON.parse(userCookie);

      const res = await api.get(`/api-uts/buglogs/user/${user.id}`);
      setBugs(res.data.data);
      setTotal(res.data.total);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching bug data:", error);
    }
  };

  const deleteBug = async (id: number) => {
    const isAgree = confirm("Apakah anda yakin ingin menghapus laporan bug ini?");
    if (isAgree) {
      try {
        const res = await api.delete(`/api-uts/buglogs/${id}`);
        showToast(res.data.message, "success");
        getData();
      } catch (error: any) {
        showToast("Gagal menghapus laporan bug", "danger");
        console.error("Error deleting bug:", error);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-md-4">
        <h1 className="mb-4">Laporan Bug saya</h1>
        
      </div>
      
      <div className="row gap-1">
        <div className="card col-lg-4 col-md-6 bg-light text-dark border-0 shadow-sm">
          <div className="card-body">
            <div className="row align-items-center">
              <h5 className="col-10 card-title mb-0">Total Laporan</h5>
              <h2 className="col fw-bold">{total}</h2>
            </div>
          </div>
        </div>
      </div>

      <h5 className="mt-4">Semua Laporan</h5>
      <div className="row g-4 mt-2">
        {bugs.map((bug) => (
          <div key={bug.id} className="col-lg-4 col-md-6">
            <div className="card bg-white border-0 shadow-sm">
              <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold text-dark mb-2 text-capitalize">
                  {bug.name}
                </h5>
                <p className="card-text text-muted small mb-4 flex-grow-1">
                  {bug.description}
                </p>

                <div className="d-flex gap-2 mb-3">
                  <span className="badge bg-warning-subtle text-warning border border-warning-subtle text-uppercase">
                    {bug.status}
                  </span>
                  <span className="badge bg-danger-subtle text-danger border border-danger-subtle text-uppercase">
                    {bug.priority}
                  </span>
                </div>

                <p className="text-muted small mb-1">
                  Projek: <span className="fw-semibold">{bug.project?.name}</span>
                </p>
                <p className="text-muted small mb-2">
                  Dilaporkan oleh: <span className="fw-semibold">{bug.user?.name}</span>
                </p>

                <div className="mb-3">
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle text-uppercase">
                    {bug.project?.stack}
                  </span>
                </div>

                <div className="d-flex gap-2 mt-auto">
                  <Link href={`/user/bug/edit/${bug.id}`} className="flex-grow-1">
                    <button className="btn btn-sm btn-primary w-100" type="button">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteBug(bug.id)}
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