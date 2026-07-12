import React, { useState, useEffect, useMemo } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import DepartmentTable from "../components/DepartmentTable";
import DepartmentForm from "../components/DepartmentForm";
import DeleteModal from "../components/DeleteModal";

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]); // Shuruat me khali array
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedDept, setSelectedDept] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState(null);

  const API_URL = "https://hrm-server-x3ui.onrender.com/api/departments";

  // 1. Fetch data from MySQL Database on component load
  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_URL}?search=${search}&status=${statusFilter}`);
      const result = await response.json();
      if (result.success) {
        setDepartments(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [search, statusFilter]);

  const openAddModal = () => {
    setFormMode("add");
    setSelectedDept(null);
    setShowForm(true);
  };

  const openEditModal = (dept) => {
    setFormMode("edit");
    setSelectedDept(dept);
    setShowForm(true);
  };

  // 2. Add or Edit handler connecting to Backend
  const handleSave = async (formData) => {
    try {
      if (formMode === "add") {
        // Backend POST Request
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        
        if (result.success) {
          // SQL me save hone ke baad table state update karo
          setDepartments([result.data, ...departments]);
        } else {
          alert(result.message || "Failed to add department");
        }
      } else {
        // Backend PUT Request
        const response = await fetch(`${API_URL}/${selectedDept.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();

        if (result.success) {
          setDepartments(
            departments.map((d) => (d.id === selectedDept.id ? result.data : d))
          );
        } else {
          alert(result.message || "Failed to update department");
        }
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleDeleteClick = (dept) => {
    setDeptToDelete(dept);
    setShowDelete(true);
  };

  // 3. Soft Delete handler connecting to Backend
  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${deptToDelete.id}/deactivate`, {
        method: "PATCH",
      });
      const result = await response.json();

      if (result.success) {
        setDepartments(
          departments.map((d) =>
            d.id === deptToDelete.id ? { ...d, status: "Inactive" } : d
          )
        );
      } else {
        alert(result.message || "Failed to deactivate department");
      }
      setShowDelete(false);
    } catch (error) {
      console.error("Error deactivating department:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
        <div>
          <h4 className="page-title mb-1">Department Management</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item active">Department</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card filter-card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="search-input-wrap">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by department name or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-4 text-md-end">
              <button className="btn btn-primary w-100 w-md-auto" onClick={openAddModal}>
                <FiPlus className="me-1" /> Add Department
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-body p-0">
          <DepartmentTable
            departments={departments} // Ab direct backend filter data use hoga
            onEdit={openEditModal}
            onDelete={handleDeleteClick}
          />
        </div>
        <div className="card-footer table-footer">
          Showing {departments.length} departments
        </div>
      </div>

      <DepartmentForm
        show={showForm}
        mode={formMode}
        initialData={selectedDept}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
      />

      <DeleteModal
        show={showDelete}
        department={deptToDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
