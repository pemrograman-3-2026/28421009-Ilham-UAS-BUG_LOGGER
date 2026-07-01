"use client";
import { showToast } from "@/components/toast/toast";
import api from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUsers() {
  const router = useRouter();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/api-uts/users", {
        name,
        email,
        phone,
        password,
        role
      });
      showToast(res.data.message, "success");
      router.push("/admin/user");
    } catch (error) {
      showToast("Gagal menambahkan user", "danger");
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Tambah User</h4>
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
              <label className="form-label">Nama</label>
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
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <option value="user">User</option>
                <option value="admin">Admin</option>
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