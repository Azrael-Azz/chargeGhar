"use client";

import React, { useState } from "react";
import styles from "./stations.module.css";
import { useRouter } from "next/navigation";
import { FiMapPin, FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

interface Station {
    id: number;
    name: string;
    location: string;
    status: "Active" | "Offline" | "Maintenance";
    chargers: number;
    utilization: number;
}

const StationsPage: React.FC = () => {
    const router = useRouter();

    const [stations, setStations] = useState<Station[]>([
        { id: 1, name: "Station A", location: "Mumbai", status: "Active", chargers: 12, utilization: 76 },
        { id: 2, name: "Station B", location: "Pune", status: "Offline", chargers: 8, utilization: 0 },
        { id: 3, name: "Station C", location: "Delhi", status: "Active", chargers: 15, utilization: 58 },
        { id: 4, name: "Station D", location: "Bangalore", status: "Maintenance", chargers: 10, utilization: 22 },
    ]);

    const [search, setSearch] = useState("");

    const filteredStations = stations.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.location.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this station?")) {
            setStations(stations.filter((s) => s.id !== id));
        }
    };

    const handleEdit = (id: number) => {
        router.push(`/dashboard/stations/edit/${id}`);
    };

    const handleAdd = () => {
        router.push("/dashboard/stations/add");
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1>Charging Stations</h1>

                <div className={styles.headerActions}>
                    <div className={styles.searchBox}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by name or location"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button className={styles.addButton} onClick={handleAdd}>
                        <FiPlus /> Add Station
                    </button>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Station Name</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Chargers</th>
                            <th>Utilization</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredStations.length > 0 ? (
                            filteredStations.map((station) => (
                                <tr key={station.id}>
                                    <td>{station.id}</td>
                                    <td>
                                        <FiMapPin className={styles.icon} /> {station.name}
                                    </td>
                                    <td>{station.location}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[station.status.toLowerCase()]}`}>
                                            {station.status}
                                        </span>
                                    </td>
                                    <td>{station.chargers}</td>
                                    <td>
                                        <div className={styles.utilizationBar}>
                                            <div
                                                className={styles.utilizationFill}
                                                style={{ width: `${station.utilization}%` }}
                                            />
                                        </div>
                                        <span className={styles.utilizationText}>{station.utilization}%</span>
                                    </td>
                                    <td>
                                        <button className={styles.editButton} onClick={() => handleEdit(station.id)}>
                                            <FiEdit />
                                        </button>
                                        <button className={styles.deleteButton} onClick={() => handleDelete(station.id)}>
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className={styles.noResults}>No stations found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StationsPage;
