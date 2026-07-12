import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function DepartmentTable({ departments, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-hover dept-table mb-0">
        <thead>
          <tr>
            <th>Dept ID</th>
            <th>Department Name</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No departments found.
              </td>
            </tr>
          )}
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td className="text-muted">{dept.dept_id}</td>
              <td className="fw-semibold">{dept.name}</td>
              <td className="text-truncate-desc">{dept.description}</td>
              <td>{new Date(dept.created_at).toLocaleDateString()}</td>
              <td>
                <span
                  className={`badge rounded-pill status-badge ${
                    dept.status === "Active" ? "badge-active" : "badge-inactive"
                  }`}
                >
                  {dept.status}
                </span>
              </td>
              <td className="text-end">
                <button
                  className="btn btn-sm btn-action btn-edit me-2"
                  onClick={() => onEdit(dept)}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button
                  className="btn btn-sm btn-action btn-delete"
                  onClick={() => onDelete(dept)}
                  title="Deactivate"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
