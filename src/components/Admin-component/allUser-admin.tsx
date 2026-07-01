'use client'
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { showToast } from "@/components/toast/toast";
import Link from "next/link";

interface IUsers {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function AllUsers() {
  const [data, setData] = useState<IUsers[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/api-uts/users");
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const deleteUser = async (id: number) => {
    const isAgree = confirm("Apakah anda yakin ingin menghapus user ini?")
    if (isAgree) {
      try {
        const res = await api.delete(`/api-uts/users/${id}`)
        showToast(res.data.message, 'success')
        getData();
      } catch (error: any) {
        showToast('Gagal menghapus user', 'danger')
        console.error("Error deleting user:", error);
      }
    }
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
      <h4>Tabel User</h4>
    
      </div>
      {/* {data.toString()} */}
    <table className="table table-hover mt-4">
      <thead>
        <tr>
          <td>Nama User</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Role</td>
          <td>Aksi</td>
          </tr>
      </thead>

      <tbody>
        {data.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="">
                <span className={`badge ${user.role === 'admin' ? 'bg-primary' : 'bg-secondary'}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <div className="d-flex gap-1">
                  <Link href={`/admin/user/${user.id}`}><button className="btn btn-sm btn-primary" type="button">Edit</button></Link>
                  <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" type="button">Hapus</button>
                  
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