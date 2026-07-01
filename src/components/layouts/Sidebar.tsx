'use client'
import { Bug, LayoutDashboard,  PanelsTopLeft, UserRound, Video } from "lucide-react";
import Link from "next/link";

const navItems = [
  { to: "/admin", icon: <LayoutDashboard />, label: "Dashboard" },
  { to: "/admin/projects/add/all", icon: <PanelsTopLeft />, label: "Semua Project" },
  { to: "/admin/bug/", icon: <Bug />, label: "Semua Laporan" },
  { to: "/admin/user/", icon: <UserRound />, label: "Semua User" },
  { to: "/admin/transaction", icon: <Video />, label: "Transaction" },
];

export default function Sidebar(
  { 
    isOpen, 
    collapsed,
    onClose 
  } : {
    isOpen: boolean,
    collapsed: boolean,
    onClose: () => void
  }
) {
  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-brand">
        {!collapsed && <span className="brand-name">CIHUY APPS</span>}
        <button
          className="btn d-md-none ms-auto"
          style={{ color: "white" }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <nav className="mt-2">
        <ul className="nav flex-column">
          {navItems.map(({ to, icon, label }) => (
            <li className="nav-item" key={to}>
              <Link
                href={to}
                className={'nav-link'}
                onClick={onClose}
                title={collapsed ? label : ""}
              >
                <span className="nav-icon">{icon}</span>
                {!collapsed && <span className="nav-label">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}