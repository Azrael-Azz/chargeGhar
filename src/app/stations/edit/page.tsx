"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../add/add.module.css";
import { FiSave, FiX } from "react-icons/fi";

const EditStation: React.FC = () => {
    const router = useRouter();
    const { id } = useParams();

    const [form, setForm] = useState({
        name: "",
        location: "",
        status: "Active",
        chargers: 0,
        utilization: 0,
    });

    useEffect(() => {
        // Fetch specific station details from API (simulated here)
        setForm({
            name: `Station ${id}`,
            location: "Delhi",
            status: "Active",
            chargers: 12,
            utilization: 65,
        });
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Station:", { id, ...form });
        router.push("/dashboard/stations");
    };

    return (
        <div className={styles.container}>
            <h1>Edit Station #{id}</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Station Name</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />

                <label>Location</label>
                <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                />

                <label>Status</label>
                <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                    <option>Active</option>
                    <option>Offline</option>
                    <option>Maintenance</option>
                </select>

                <label>Chargers</label>
                <input
                    type="number"
                    value={form.chargers}
                    onChange={(e) => setForm({ ...form, chargers: Number(e.target.value) })}
                    required
                />

                <label>Utilization (%)</label>
                <input
                    type="number"
                    value={form.utilization}
                    onChange={(e) => setForm({ ...form, utilization: Number(e.target.value) })}
                    required
                />

                <div className={styles.buttons}>
                    <button type="submit" className={styles.save}>
                        <FiSave /> Update
                    </button>
                    <button
                        type="button"
                        className={styles.cancel}
                        onClick={() => router.push("/dashboard/stations")}
                    >
                        <FiX /> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStation;
