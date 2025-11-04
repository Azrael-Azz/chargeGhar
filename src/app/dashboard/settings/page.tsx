"use client";

import React, { useState } from "react";
import styles from "./settings.module.css";
import { FiEdit, FiTrash2, FiPlus, FiUser, FiLock } from "react-icons/fi";
import { useDashboardData } from "../../../contexts/DashboardDataContext";

export default function SettingsPage() {
    const { packagesData, loading, error } = useDashboardData();

    const packages = packagesData?.packages || [];

    const [coupons] = useState([
        { id: 1, code: "SAVE10", discount: "10%", status: "Active" },
        { id: 2, code: "FREEDAY", discount: "100%", status: "Expired" },
    ]);

    const [achievements] = useState([
        { id: 1, name: "Make First Purchase", points: 100, difficulty: "Easy", active: true },
    ]);

    const [admin, setAdmin] = useState({
        userId: "A1029",
        name: "Admin User",
        email: "mah******60@gmail.com",
        phone: "98******51",
    });

    const handleEdit = (field: keyof typeof admin) => {
        const newValue = prompt(`Enter new ${field}:`, admin[field]);
        if (newValue) {
            setAdmin({ ...admin, [field]: newValue });
        }
    };

    if (loading) {
        return <div className={styles.settingsContainer}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.settingsContainer}>{error}</div>;
    }

    return (
        <div className={styles.settingsContainer}>
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>Manage system configurations</p>

            {/* PACKAGES SECTION */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Packages</h2>
                    <button className={styles.addButton}><FiPlus /> Add Package</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Package ID</th>
                            <th>Package Name</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg: any) => (
                            <tr key={pkg.id}>
                                <td>{pkg.id}</td>
                                <td>{pkg.name}</td>
                                <td>{pkg.duration_display}</td>
                                <td>{pkg.price}</td>
                                <td>
                                    <span className={`${styles.status} ${pkg.is_active ? styles.active : styles.inactive}`}>
                                        {pkg.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td>
                                    <button className={styles.editBtn}><FiEdit /></button>
                                    <button className={styles.deleteBtn}><FiTrash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* COUPONS SECTION */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Coupons</h2>
                    <button className={styles.addButton}><FiPlus /> Add Coupon</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Coupon ID</th>
                            <th>Coupon Code</th>
                            <th>Discount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.code}</td>
                                <td>{c.discount}</td>
                                <td><span className={`${styles.status} ${c.status === "Active" ? styles.active : styles.inactive}`}>{c.status}</span></td>
                                <td>
                                    <button className={styles.editBtn}><FiEdit /></button>
                                    <button className={styles.deleteBtn}><FiTrash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* ACHIEVEMENTS SECTION */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Achievements and Points Assignment</h2>
                    <div className={styles.headerActions}>
                        <button className={styles.addButton}><FiPlus /> Assign Points</button>
                        <button className={styles.addButton}><FiPlus /> Add Achievement</button>
                    </div>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Achievement ID</th>
                            <th>Achievement Name</th>
                            <th>Points Assigned</th>
                            <th>Difficulty</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {achievements.map((a) => (
                            <tr key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.points} pts</td>
                                <td>{a.difficulty}</td>
                                <td><span className={`${styles.status} ${a.active ? styles.active : styles.inactive}`}>{a.active ? "Active" : "Inactive"}</span></td>
                                <td>
                                    <button className={styles.editBtn}><FiEdit /></button>
                                    <button className={styles.deleteBtn}><FiTrash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* ADMIN PROFILE UPDATE */}
            <section className={styles.profileSection}>
                <h2>Admin Profile Update</h2>
                <div className={styles.profileSection}>
                    <h2 className={styles.profileTitle}>Admin Profile Update</h2>

                    <div className={styles.profileContainer}>
                        {/* Left Card */}
                        <div className={styles.leftCard}>
                            <div className={styles.profileTop}>
                                <div className={styles.avatar}>
                                    <FiUser className={styles.profileIcon} />
                                </div>
                                <div className={styles.profileHeader}>
                                    <h3>{admin.name}</h3>
                                    <button className={styles.editProfileBtn}>
                                        <FiEdit /> Edit Profile
                                    </button>
                                </div>
                            </div>

                            <div className={styles.profileDetails}>
                                <div className={styles.profileRow}>
                                    <span>User ID:</span>
                                    <span>{admin.userId}</span>
                                </div>

                                <div className={styles.profileRow}>
                                    <span>Username:</span>
                                    <span>{admin.name}</span>
                                    <button className={styles.inlineEdit} onClick={() => handleEdit("name")}>
                                        <FiEdit />
                                    </button>
                                </div>

                                <div className={styles.profileRow}>
                                    <span>Email:</span>
                                    <span>{admin.email}</span>
                                    <button className={styles.inlineEdit} onClick={() => handleEdit("email")}>
                                        <FiEdit />
                                    </button>
                                </div>

                                <div className={styles.profileRow}>
                                    <span>Phone:</span>
                                    <span>{admin.phone}</span>
                                    <button className={styles.inlineEdit} onClick={() => handleEdit("phone")}>
                                        <FiEdit />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className={styles.rightCard}>
                            <h3 className={styles.authTitle}>
                                <FiLock /> Password and Authentication
                            </h3>

                            <button className={styles.changePassBtn}>Change Password</button>

                            <div className={styles.authBox}>
                                <h4>Email Authentication</h4>
                                <p>
                                    Verify your authentication using Gmail. Your current email account
                                    is: <span className={styles.bold}>{admin.email}</span>
                                </p>

                                <div className={styles.active}>
                                    <label>
                                        <input type="button" name="emailAuth" defaultChecked /> Active Authentication
                                    </label>
                                </div>
                            </div>

                            <div className={styles.authBox}>
                                <h4>SMS Authentication</h4>
                                <p>
                                    Verify using SMS sent to your phone number. Your current phone
                                    number is: <span className={styles.bold}>{admin.phone}</span>
                                </p>

                                <div className={styles.deactivate}>
                                    <label>
                                        <input type="button" name="smsAuth" defaultChecked /> Deactivate SMS Authentication
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
