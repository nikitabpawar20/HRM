import React, { useState, useEffect } from "react";

export default function DepartmentForm({ show, mode, initialData, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", description: "", status: "Active" });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description,
        status: initialData.status,
      });
    } else {
      setForm({ name: "", description: "", status: "Active" });
    }
    setValidated(false);
  }, [initialData, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    onSave(form);
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === "edit" ? "Edit Department" : "Add Department"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <form noValidate className={validated ? "was-validated" : ""} onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={3}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid department name (min 3 characters).
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Department Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <div className="invalid-feedback">Please provide a description.</div>
                </div>
                <div className="mb-1">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}