"use client";

import React, { useState } from "react";
import styles from "./settings.module.css";
import { FiEdit, FiTrash2, FiPlus, FiToggleLeft, FiToggleRight, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Package {
    id: number;
    name: string;
    type: string;
    duration: string;
    price: string;
    active: boolean;
}

interface Coupon {
    id: number;
    name: string;
    discount: string;
    expiry: string;
    status: boolean;
}

const SettingsPage = () => {
    const router = useRouter();

    const [packages, setPackages] = useState<Package[]>([
        { id: 1, name: "Package A", type: "Hourly", duration: "1h", price: "Rs 50", active: true },
        { id: 2, name: "Package B", type: "Daily", duration: "24h", price: "Rs 250", active: false },
    ]);

    const [coupons, setCoupons] = useState<Coupon[]>([
        { id: 1, name: "SAVE10", discount: "10%", expiry: "2025-12-01", status: true },
        { id: 2, name: "OFFER20", discount: "20%", expiry: "2025-11-15", status: false },
    ]);

    const togglePackage = (id: number) => {
        setPackages((prev) =>
            prev.map((pkg) => (pkg.id === id ? { ...pkg, active: !pkg.active } : pkg))
        );
    };

    const toggleCoupon = (id: number) => {
        setCoupons((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: !c.status } : c))
        );
    };

    const handleDelete = (id: number, type: string) => {
        if (confirm(`Delete this ${type}?`)) {
            if (type === "package") setPackages((p) => p.filter((x) => x.id !== id));
            else setCoupons((c) => c.filter((x) => x.id !== id));
        }
    };

    const handleAdd = (type: string) => {
        router.push(`/dashboard/settings/add-${type}`);
    };

    const handleEdit = (type: string, id: number) => {
        router.push(`/dashboard/settings/edit-${type}/${id}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>Manage system configurations</p>

            {/* PACKAGES */}
            <section className={styles.card}>
                <div className={styles.sectionHeader}>
                    <h2>Packages</h2>
                    <button className={styles.addBtn} onClick={() => handleAdd("package")}>
                        <FiPlus /> Add Package
                    </button>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Package Name</th>
                            <th>Type</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg.id}>
                                <td>{pkg.id}</td>
                                <td>{pkg.name}</td>
                                <td>{pkg.type}</td>
                                <td>{pkg.duration}</td>
                                <td>{pkg.price}</td>
                                <td>
                                    <button
                                        className={styles.toggleBtn}
                                        onClick={() => togglePackage(pkg.id)}
                                    >
                                        {pkg.active ? <FiToggleRight className={styles.active} /> : <FiToggleLeft className={styles.inactive} />}
                                    </button>
                                </td>
                                <td>
                                    <button className={styles.editBtn} onClick={() => handleEdit("package", pkg.id)}>
                                        <FiEdit />
                                    </button>
                                    <button className={styles.deleteBtn} onClick={() => handleDelete(pkg.id, "package")}>
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* COUPONS */}
            <section className={styles.card}>
                <div className={styles.sectionHeader}>
                    <h2>Coupons</h2>
                    <button className={styles.addBtn} onClick={() => handleAdd("coupon")}>
                        <FiPlus /> Add Coupon
                    </button>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coupon Name</th>
                            <th>Discount</th>
                            <th>Expiry</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon.id}>
                                <td>{coupon.id}</td>
                                <td>{coupon.name}</td>
                                <td>{coupon.discount}</td>
                                <td>{coupon.expiry}</td>
                                <td>
                                    <button
                                        className={styles.toggleBtn}
                                        onClick={() => toggleCoupon(coupon.id)}
                                    >
                                        {coupon.status ? <FiToggleRight className={styles.active} /> : <FiToggleLeft className={styles.inactive} />}
                                    </button>
                                </td>
                                <td>
                                    <button className={styles.editBtn} onClick={() => handleEdit("coupon", coupon.id)}>
                                        <FiEdit />
                                    </button>
                                    <button className={styles.deleteBtn} onClick={() => handleDelete(coupon.id, "coupon")}>
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* ADMIN PROFILE */}
            <section className={styles.profileCard}>
                <h2>Admin Profile Update</h2>
                <div className={styles.profileGrid}>
                    <div className={styles.profileInfo}>
                        <FiUser className={styles.profileIcon} />
                        <p><strong>Name:</strong> Admin</p>
                        <p><strong>Email:</strong> admin@chargeghar.com</p>
                        <p><strong>Role:</strong> Super Admin</p>
                        <button className={styles.editBtn}>Edit Profile</button>
                    </div>

                    <div className={styles.passwordSection}>
                        <h3>Password and Notifications</h3>
                        <button className={styles.saveBtn}>Change Password</button>

                        <div className={styles.toggleContainer}>
                            <label>Email Notifications</label>
                            <button className={styles.toggleBtn}>
                                <FiToggleRight className={styles.active} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SettingsPage;
