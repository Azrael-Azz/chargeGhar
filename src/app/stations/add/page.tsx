"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddStation.module.css";
import { FiSave, FiX } from "react-icons/fi";

const AddStation: React.FC = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        location: "",
        status: "Active",
        chargers: 0,
        utilization: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New Station:", form);
        router.push("/dashboard/stations");
    };

    return (
        <div className={styles.container}>
            <h1>Add New Station</h1>

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
                        <FiSave /> Save
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

export default AddStation;
