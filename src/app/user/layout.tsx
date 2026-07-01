'use client'
import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar_user";
import React, { useState } from "react";

export default function AdminLayout ({
    children
  }: Readonly<{
    children: React.ReactNode
  }>
) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="d-flex">
      <div
        className={`sidebar-backdrop ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-grow-1 d-flex flex-column main-content">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />

        <main className="p-4 flex-grow-1 bg-light">
          {children}
        </main>
      </div>
    </div>
  )
}

