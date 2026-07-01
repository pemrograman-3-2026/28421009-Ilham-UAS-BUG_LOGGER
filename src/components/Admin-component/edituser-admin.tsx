"use client";
import { showToast } from "@/components/toast/toast";
import api from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const getUsersDetail = async () => {
    try {
      const res = await api.get(`/api-uts/users/${id}`);
      const user = res.data.data;
      // console.log("User detail:", user);
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setRole(user.role);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };


  useEffect(() => {
    getUsersDetail();
    // getBugDetail();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api-uts/users/${id}`, {
        name,
        email,
        phone,
        role,
      });
      showToast(res.data.message, "success");
      router.push("/admin/user");
    } catch (error) {
      showToast("Gagal mengupdate user", "danger");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Edit User</h4>
        <Link href="/admin/user">
          <button className="btn btn-sm btn-primary" type="button">
            Kembali
          </button>
        </Link>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama User</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
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