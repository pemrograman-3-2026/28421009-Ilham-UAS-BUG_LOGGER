'use client'
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link"
import { showToast } from "@/components/toast/toast";

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

export default function Bug() {
  const [data, setData] = useState<IBugs[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/api-uts/buglogs");
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching bug data:", error);
    }
  }

  const deleteBug = async (id: number) => {
    const isAgree = confirm("Apakah anda yakin ingin menghapus bug ini?")
    if (isAgree) {
      try {
        const res = await api.delete(`/api-uts/buglogs/${id}`)
        showToast(res.data.message, 'success')
        getData();
      } catch (error: any) {
        showToast('Gagal menghapus bug', 'danger')
        console.error("Error deleting bug:", error);
      }
    }
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
      <h4>Tabel Bug</h4>
    
      </div>
      {/* {data.toString()} */}
    <table className="table table-hover mt-4">
      <thead>
        <tr>
          <td>Nama bug</td>
          <td>Deskripsi</td>
          <td>Status</td>
          <td>Prioritas</td>
          <td>user</td>
          <td>projek</td>
          {/* <td>Dibuat pada</td> */}
          <td>Aksi</td>
          </tr>
      </thead>

      <tbody>
        {data.map((d) => {
          return (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.description}</td>
              <td>{d.status}</td>
              <td>{d.priority}</td>
              <td>{d.user.name}</td>
              <td>{d.project.name}</td>
              {/* <td>{d.created_at}</td> */}
              <td>
                <div className="d-flex gap-1">
                 
                  <button onClick={() => deleteBug(d.id)}  className="btn btn-sm btn-danger" type="button">Hapus</button>
                </div>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
    </div>
  )
}