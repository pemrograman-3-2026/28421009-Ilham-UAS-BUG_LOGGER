'use client'
import { Bug, LayoutDashboard, Plus,  } from "lucide-react";
import Link from "next/link";

const navItems = [
  { to: "/user", icon: <LayoutDashboard />, label: "Dashboard" },
  { to: "/user/bug", icon: <Bug />, label: "Laporan Bug" },
  { to: "/user/bug/add", icon: <Plus />, label: "Tambah Laporan Bug" },
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
        {!collapsed && <span className="brand-name">BugLogs</span>}
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