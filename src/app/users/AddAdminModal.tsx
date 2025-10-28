"use client";

import React, { useState } from "react";
import styles from "./AddAdminModal.module.css";

export default function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.profileIcon}>
          <div className={styles.iconCircle}>👤</div>
        </div>

        <h2 className={styles.title}>Personal Information</h2>

        <form className={styles.form}>
          <div className={styles.row}>
            <label>
              Name
              <input type="text" placeholder="<username>" />
            </label>

            <label>
              Role
              <select>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </label>
          </div>

          <div className={styles.row}>
            <label>
              Email Address
              <input type="email" placeholder="<emailaddress>" />
            </label>

            <label>
              Phone Number
              <input type="tel" placeholder="<phoneno>" />
            </label>
          </div>

          <label>
            Password
            <input type="password" placeholder="<password>" />
          </label>

          <div className={styles.statusRow}>
            <span>Status</span>
            <div
              className={`${styles.toggle} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => setIsActive(!isActive)}
            >
              <div className={styles.knob}></div>
            </div>
            <span
              className={`${styles.statusText} ${
                isActive ? styles.activeText : ""
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className={styles.access}>
            <span>Access Level</span>
            <div className={styles.accessGrid}>
              <label><input type="radio" name="access" /> Station</label>
              <label><input type="radio" name="access" /> Transactions</label>
              <label><input type="radio" name="access" /> Users</label>
              <label><input type="radio" name="access" /> Settings</label>
              <label><input type="radio" name="access" /> Rentals</label>
            </div>
          </div>

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
