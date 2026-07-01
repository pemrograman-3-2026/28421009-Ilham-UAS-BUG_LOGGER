"use client";
import api, { baseURL } from "@/lib/axios";
import { useEffect, useState } from "react";

export interface IProjects {
  id: string | number;
  name: string;
  description: string;
  stack: string;
}

export default function ProjectDashboard() {
  const [projects, setProjects] = useState<IProjects[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalbugs, setTotalbugs] = useState<number>(0);
  const [totalusers, setTotalusers] = useState<number>(0);

  useEffect(() => {
    getData();
    getBugData();
    getUserData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/api-uts/projects");
      setProjects(res.data.data);
      setTotal(res.data.total);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const getBugData = async () => {
    try {
      const res = await api.get(`/api-uts/buglogs/`);
      // setBugs(res.data.data);
      setTotalbugs(res.data.total);
      console.log(res.data.total);
    } catch (error) {
      console.error("Error fetching bug data:", error);
    }
  };
  
  const getUserData = async () => {
    try {
      const res = await api.get(`/api-uts/users`);
      // setBugs(res.data.data);
      setTotalusers(res.data.total);
      console.log(res.data.total);
    } catch (error) {
      console.error("Error fetching bug data:", error);
    }
}

  return (
    <div className="row">
      <div className="col-lg-12 col-md-8">
        <h1 className="mb-4">Dashboard Admin</h1>
      </div>
      <div className="row gap-1">
        
        <div className="card col-lg col-md-6 bg-light text-dark border-0 shadow-sm ">
          <div className="card-body">
            <div className="row align-items-center">
              <h5 className="col-10 card-title mb-0">Total Projek</h5>
              <h2 className="col fw-bold">{total}</h2>
            </div>
          </div>
        </div>
        <div className="card col-lg col-md-6 bg-light text-dark border-0 shadow-sm ">
          <div className="card-body">
            <div className="row align-items-center">
              <h5 className="col-10 card-title mb-0">Total Laporan Bug</h5>
              <h2 className="col fw-bold">{totalbugs}</h2>
            </div>
          </div>
        </div>
        <div className="card col-lg col-md-6 bg-light text-dark border-0 shadow-sm ">
          <div className="card-body">
            <div className="row align-items-center">
              <h5 className="col-10 card-title mb-0">Total Pengguna</h5>
              <h2 className="col fw-bold">{totalusers}</h2>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mt-4">Semua Projek</h5>
      <div className="row g-4 mt-2">
        {projects.map((project) => (
          <div key={project.id} className="col-lg-4 col-md-6">
            <div className="card bg-white border-0 shadow-sm">
              <div className="card-body d-flex flex-column p-4">
                
                <h5 className="card-title fw-bold text-dark mb-2 text-capitalize">
                  {project.name}
                </h5>
                <p className="card-text text-muted small mb-4 flex-grow-1">
                  {project.description}
                </p>

                <div>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle text-uppercase ">
                    {project.stack}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
