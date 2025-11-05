"use client";

import React, { useState, useMemo } from "react";
import styles from "./users.module.css";
import {
  FiShield,
  FiUsers,
  FiTrash2,
  FiSearch,
  FiArrowDown,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import AddAdminModal from "./addadmin/AddAdminModal";
import { useDashboardData } from "../../../contexts/DashboardDataContext";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  rentals: string;
  createdAt: string;
}

export default function UsersPage() {
  const { dashboardData, loading, error } = useDashboardData();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Static mock data — defined inside component
  const usersData: User[] = [
    {
      id: "U001",
      name: "User One",
      email: "user1@email.com",
      phone: "9841111111",
      rentals: "3",
      createdAt: "08/09/2025",
    },
    {
      id: "U002",
      name: "User Two",
      email: "user2@email.com",
      phone: "9852222222",
      rentals: "5",
      createdAt: "08/09/2025",
    },
  ];

  const sortOptions: { key: keyof User; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone No." },
    { key: "rentals", label: "Rentals" },
    { key: "createdAt", label: "Created Date" },
  ];

  const admins = dashboardData?.profiles || [];

  const handleSortSelect = (key: keyof User) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setShowSortMenu(false);
  };

  const displayedUsers = useMemo((): User[] => {
    let list: User[] = [...usersData];

    // Search: filter by ID, name, email, phone
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const phoneDigits = search.replace(/\D/g, "");
      list = list.filter(
        (u) =>
          u.id.toLowerCase().includes(q) ||
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(phoneDigits)
      );
    }

    // Sort
    return list.sort((a, b) => {
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
  }, [search, sortKey, sortDir, usersData]);

  if (loading) {
    return <main className={styles.container}>Loading...</main>;
  }

  if (error) {
    return <main className={styles.container}>{error}</main>;
  }

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
            {admins.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                  No admins found
                </td>
              </tr>
            ) : (
              admins.map((admin: any) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phone}</td>
                  <td>{admin.role || "Admin"}</td>
                  <td>
                    <span className={styles.statusActive}>Active</span>
                  </td>
                  <td>{admin.created_at || admin.createdAt || "—"}</td>
                  <td>
                    <button className={styles.deleteBtn} title="Delete admin">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* USER CONTROLS */}
      <div className={styles.controls}>
        {/* SEARCH */}
        <div style={{ position: "relative", width: "240px" }}>
          <FiSearch
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#777",
              fontSize: "1rem",
            }}
          />
          <input
            className={styles.search}
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.5rem", paddingRight: search ? "2rem" : "1rem" }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#aaa",
                fontSize: "1.2rem",
                cursor: "pointer",
                padding: 0,
              }}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* SORT BY BUTTON */}
        <div style={{ position: "relative" }}>
          <button
            className={styles.sortBtn}
            onClick={() => setShowSortMenu((s) => !s)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
            }}
          >
            <FiArrowDown style={{ fontSize: "1rem" }} />
            Sort By
            <FiChevronDown style={{ fontSize: "0.8rem", marginLeft: "0.25rem" }} />
          </button>

          {/* SORT OPTIONS */}
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
                overflow: "hidden",
              }}
            >
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSortSelect(opt.key)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    background: sortKey === opt.key ? "#333" : "transparent",
                    color: sortKey === opt.key ? "#fff" : "#ccc",
                    border: "none",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (sortKey !== opt.key) {
                      e.currentTarget.style.backgroundColor = "#2a2a2a";
                      e.currentTarget.style.color = "#32cd32";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sortKey !== opt.key) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#ccc";
                    }
                  }}
                >
                  <span>{opt.label}</span>
                  {sortKey === opt.key && (
                    <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                      {sortDir === "asc" ? <FiChevronUp /> : <FiChevronDown />}
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
                <td
                  colSpan={8}
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  {search ? "No users match your search." : "No users found."}
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
                    <button className={styles.deleteBtn} title="Delete user">
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