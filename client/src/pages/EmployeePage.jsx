import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function EmployeePage() {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setUsers(result.data);

        const roles = {};

        result.data.forEach((u) => {
          roles[u.id] = u.role;
        });

        setSelectedRoles(roles);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRole = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(
        `http://localhost:5000/api/users/${id}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role: selectedRoles[id],
          }),
        }
      );
      
      const result = await response.json();
      
      if (result.success) {
        alert("Role updated successfully ✅");
        fetchUsers(); // Table refresh
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="page-container">
      <h3>Employee Role Management</h3>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.full_name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td>
                <select
                  className="form-select"
                  value={selectedRoles[u.id] || u.role}
                  onChange={(e) =>
                    setSelectedRoles({
                      ...selectedRoles,
                      [u.id]: e.target.value,
                    })
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="TeamLeader">Team Leader</option>
                  <option value="Employee">Employee</option>
                </select>
              </td>

              <td>
                <button
                className="btn btn-primary btn-sm"
                onClick={() => updateRole(u.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}