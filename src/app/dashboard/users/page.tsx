"use client";

import React, { useState, useMemo } from "react";
import styles from "./users.module.css";
import adminsData from "../../../data/admin.json";
import usersData from "../../../data/users.json";
import { FiShield, FiUsers, FiTrash2, FiFilter, FiSearch } from "react-icons/fi";
import AddAdminModal from "./addadmin/AddAdminModal";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  rentals: string;
  createdAt: string;
}

type SortKey = keyof User;
type SortDirection = "asc" | "desc";

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone No." },
    { key: "rentals", label: "Rentals" },
    { key: "createdAt", label: "Created Date" },
  ];



  const handleSortSelect = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setShowSortMenu(false);
  };

  const displayedUsers = useMemo((): User[] => {
    let list: User[] = usersData as User[];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (u) =>
          u.id.includes(search.trim()) ||
          u.name.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      let aVal: string | number = a[sortKey];
      let bVal: string | number = b[sortKey];

      if (sortKey === "id" || sortKey === "rentals") {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else if (sortKey === "createdAt") {
        const [d1, m1, y1] = aVal.split("/").map(Number);
        const [d2, m2, y2] = bVal.split("/").map(Number);
        aVal = new Date(y1, m1 - 1, d1).getTime();
        bVal = new Date(y2, m2 - 1, d2).getTime();
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [search, sortKey, sortDir]);

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

      {/* USER CONTROLS */}
      <div className={styles.controls}>
        {/* SEARCH */}
        <div style={{ position: "relative", width: "200px" }}>
          <FiSearch
            style={{
              position: "absolute",
              left: "0.6rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#777",
            }}
          />
          <input
            className={styles.search}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2rem" }}
          />
        </div>

        {/* SORT BY BUTTON */}
        <div style={{ position: "relative" }}>
          <button
            className={styles.sortBtn}
            onClick={() => setShowSortMenu((s) => !s)}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FiFilter className={styles.icon} />
            Sort By
            <FiSearch style={{ fontSize: "0.8rem" }} />
          </button>

          {/* SORT OPTIONS – ONLY TEXT HOVERS GREEN */}
          {showSortMenu && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "8px",
                minWidth: "180px",
                zIndex: 10,
                marginTop: "0.5rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSortSelect(opt.key)}
                  style={{

                    width: "100%",
                    padding: "0.6rem 1rem",
                    textAlign: "left",
                    background: sortKey === opt.key ? "rgba(240, 240, 240, 0.3)" : "transparent",
                    color: sortKey === opt.key ? "#000" : "#ccc",
                    border: "none",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* TEXT WITH GREEN HOVER */}
                  <span
                    onMouseEnter={(e) => {
                      if (sortKey !== opt.key) {
                        e.currentTarget.style.color = "#32cd32";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (sortKey !== opt.key) {
                        e.currentTarget.style.color = "#ccc";
                      }
                    }}
                    style={{
                      transition: "color 0.2s",
                    }}
                  >
                    {opt.label}
                  </span>

                  {/* ASC/DESC ICON */}
                  {sortKey === opt.key && (
                    <span style={{ fontSize: "0.8rem", color: "#000" }}>
                      {sortDir === "asc" ? "up" : "down"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
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
            {displayedUsers.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                  No users found
                </td>
              </tr>
            ) : (
              displayedUsers.map((user) => (
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
              ))
            )}
          </tbody>
        </table>
      </section>

      {showModal && <AddAdminModal onClose={() => setShowModal(false)} />}
    </main>
  );
}