import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function DeleteModal({ show, department, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-body text-center py-4">
              <div className="warning-icon-wrap mb-3">
                <FiAlertTriangle size={32} />
              </div>
              <h5 className="mb-2">Deactivate Department</h5>
              <p className="text-muted mb-0">
                Are you sure you want to deactivate{" "}
                <strong>{department?.name}</strong>? This will mark the
                department as <strong>Inactive</strong>. No data will be
                permanently deleted.
              </p>
            </div>
            <div className="modal-footer justify-content-center border-0 pb-4">
              <button className="btn btn-outline-secondary px-4" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-danger px-4" onClick={onConfirm}>
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}