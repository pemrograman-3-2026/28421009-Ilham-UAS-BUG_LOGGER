"use client";

import { showToast } from "@/components/toast/toast";
import AnimationLottie from "@/components/animation/animation";
import api from "@/lib/axios";
import { IUser } from "@/proxy";
import { useRouter } from "next/dist/client/components/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/api-uts/users/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log(res.data);
      showToast(res.data.message, "success");
      const data = res.data.data as IUser;
      router.push(`/${data.role.toLowerCase()}`);
    } catch (error: any) {
      console.log(error);
      showToast(error.response.data.message, "danger");
    }
  };
  return (
    <div className="row">
      
      <div className="col-lg-6 d-none d-lg-block bg-white">
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-white">
          <div className="text-center">
            <AnimationLottie className="align-items-center"/>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-12 bg-primary">
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-primary">
          <div
            className="card border-0 shadow"
            style={{ width: "100%", maxWidth: "500px", borderRadius: "12px" }}
          >
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-4 text-center">
                  <img src="/logo.webp" alt="Logo" className="img-fluid" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center flex-column">
                <h4 className="fw-bold mb-1">Selamat Datang Kembali</h4>
                <p className="text-muted small mb-4">Masuk ke Akun Anda</p>
              </div>

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm py-2"
                    placeholder="user@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-sm py-2"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100 py-2 text-white fw-semibold bg-primary"
                  style={{ borderRadius: "8px" }}
                >
                  Masuk
                </button>
              </form>
              <Link href={"/register"}>
                <div>
                  <p className="text-left text-muted small mt-2 mb-0">
                    Belum punya akun?
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
