'use client'

import { useRouter } from "next/dist/client/components/navigation";
import { logoutAction } from "./Logout";
import { useEffect, useState } from "react";

export default function Navbar(
  { 
    onToggleSidebar, 
    onToggleCollapse
  } : {
    onToggleSidebar: () => void,
    onToggleCollapse: () => void,
  }
) {
  const router = useRouter()
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
  const match = document.cookie.match(/(?:^|;\s*)user=([^;]*)/);
  if (match) {
    try {
      const userData = JSON.parse(decodeURIComponent(match[1]));
      setUsername(userData.name ?? "Guest");
    } catch {
      setUsername(decodeURIComponent(match[1]));
    }
  }
}, []);
  const logout =  () => {
    logoutAction()
    router.push('/')
  }
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-3">
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-outline-secondary d-md-none"
          onClick={onToggleSidebar}
        >
          ☰
        </button>
        <button
          className="btn btn-sm btn-outline-secondary d-none d-md-inline-flex"
          onClick={onToggleCollapse}
        >
          ☰
        </button>
        <span className="text-muted small fw-semibold">Welcome back, {username}</span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}