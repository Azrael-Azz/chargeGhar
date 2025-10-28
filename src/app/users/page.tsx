"use client";

import React, { useState } from "react";
import styles from "./users.module.css";
import adminsData from "../../data/admin.json";
import usersData from "../../data/users.json";
import { FiShield, FiUsers, FiTrash2, FiFilter } from "react-icons/fi";
import AddAdminModal from "./AddAdminModal";

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Users</h1>
        <p className={styles.subtitle}>
          View and Manage admins, users and their permissions.
        </p>
      </header>

      <div className={styles.addButtonWrapper}>
        <button
          className={styles.addButton}
          onClick={() => setShowModal(true)}
        >
          + Add Admin
        </button>
      </div>

      {/* Admin Users Table */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <FiShield className={styles.icon} /> Admin Users
          </div>
          <p className={styles.cardSubText}>
            Manage admins and their permissions
          </p>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adminsData.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.phone}</td>
                <td>{admin.role}</td>
                <td>
                  <span className={styles.statusActive}>Active</span>
                </td>
                <td>{admin.createdAt}</td>
                <td>
                  <button className={styles.deleteBtn}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className={styles.controls}>
        <input className={styles.search} placeholder="Search" />
        <button className={styles.sortBtn}>
          <FiFilter className={styles.icon} /> Sort By
        </button>
      </div>

      {/* Users Table */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <FiUsers className={styles.icon} /> Users
          </div>
          <p className={styles.cardSubText}>Manage users</p>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Rentals</th>
              <th>Status</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.rentals}</td>
                <td>
                  <span className={styles.statusActive}>Active</span>
                </td>
                <td>{user.createdAt}</td>
                <td>
                  <button className={styles.deleteBtn}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showModal && <AddAdminModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
