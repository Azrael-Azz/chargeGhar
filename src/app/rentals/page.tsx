"use client";

import React from "react";
import styles from "./rentals.module.css";
import { FiFilter, FiDownload, FiShoppingBag } from "react-icons/fi"; 

const rentalData = [
  {
    id: "<rental_id>",
    user: "<user_id>",
    station: "Gwarko, Lalitpur",
    package: "30 Min/s",
    start: "03:00 Pm",
    end: "-----",
    amount: "-----",
    status: "Active",
  },
  {
    id: "<rental_id>",
    user: "<user_id>",
    station: "City Square Mall, Samakhushi",
    package: "30 Min/s",
    start: "02:45 Pm",
    end: "-----",
    amount: "-----",
    status: "Overdue",
  },
  {
    id: "<rental_id>",
    user: "<user_id>",
    station: "New Road, Sundhara",
    package: "1 Day/s",
    start: "02:17 Pm",
    end: "-----",
    amount: "-----",
    status: "Active",
  },
  {
    id: "<rental_id>",
    user: "<user_id>",
    station: "Paknajol, Chhetrapati",
    package: "1 Hr/s",
    start: "12:00 Pm",
    end: "Null",
    amount: "Null",
    status: "Refunded",
  },
  {
    id: "<rental_id>",
    user: "<user_id>",
    station: "DDC, Lainchor",
    package: "1 Hr/s",
    start: "08:00 Am",
    end: "09:00 Am",
    amount: "Rs 100",
    status: "Completed",
  },
];

export default function RentalsPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Rentals</h1>
        <p className={styles.subtitle}>
          View and Manage all the rental history and rental packages.
        </p>
      </header>

      <div className={styles.tabs}>
        {["All", "Active", "Overdue", "Completed", "Refunded"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              tab === "All" ? styles.activeTab : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <button className={styles.sortBtn}>
          <FiFilter className={styles.icon} /> Sort By
        </button>
      </div>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <FiShoppingBag className={styles.icon} /> 
            Rentals
          </h2>
          <button className={styles.exportBtn}>
            <FiDownload /> Export as CSV
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rental ID</th>
              <th>User</th>
              <th>Station Name</th>
              <th>Package</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Amount (Rs)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rentalData.map((rental, index) => (
              <tr key={index}>
                <td>{rental.id}</td>
                <td>{rental.user}</td>
                <td>{rental.station}</td>
                <td>{rental.package}</td>
                <td>{rental.start}</td>
                <td>{rental.end}</td>
                <td>{rental.amount}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[rental.status.toLowerCase()]
                    }`}
                  >
                    {rental.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
