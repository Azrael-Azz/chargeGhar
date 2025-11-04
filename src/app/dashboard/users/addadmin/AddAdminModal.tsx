"use client";

import React, { useState } from "react";
import styles from "./AddAdminModal.module.css";
import instance from "../../../../lib/axios";
import { useDashboardData } from "../../../../contexts/DashboardDataContext";

export default function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState<string | null>(null);
  const { dashboardData, loading, error: dashboardError, refetchProfiles } = useDashboardData();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await instance.post("/api/admin/profiles", { user: email, role });
      if (response.data.success) {
        onClose();
        refetchProfiles(); // This function needs to be implemented in the context to refetch data
      } else {
        setError(response.data.message || "Failed to create admin");
      }
    } catch (err: any) {
      console.error("Error creating admin:", err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.profileIcon}>
          <div className={styles.iconCircle}>👤</div>
        </div>

        <h2 className={styles.title}>Personal Information</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label>
              Email Address
              <input type="email" placeholder="<emailaddress>" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label>
              Role
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </label>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.createBtn}>
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
