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

import { useDashboardData } from "../../../contexts/DashboardDataContext";

const StationsPage: React.FC = () => {
    const router = useRouter();
    const { dashboardData, loading, error } = useDashboardData();

    const [search, setSearch] = useState("");

    const stations = dashboardData?.stations?.results || [];

    const filteredStations = stations.filter(
        (s: any) =>
            s.station_name.toLowerCase().includes(search.toLowerCase()) ||
            s.address.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this station?")) {
            // Implement delete functionality here
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/dashboard/stations/edit/${id}`);
    };

    const handleAdd = () => {
        router.push("/dashboard/stations/add");
    };

    if (loading) {
        return <div className={styles.pageContainer}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.pageContainer}>{error}</div>;
    }

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
                            filteredStations.map((station: any, index: number) => (
                                <tr key={station.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <FiMapPin className={styles.icon} /> {station.station_name}
                                    </td>
                                    <td>{station.address}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[station.status.toLowerCase()]}`}>
                                            {station.status}
                                        </span>
                                    </td>
                                    <td>{station.total_slots}</td>
                                    <td>
                                        <div className={styles.utilizationBar}>
                                            <div
                                                className={styles.utilizationFill}
                                                style={{ width: `${(station.total_slots - station.available_slots) / station.total_slots * 100}%` }}
                                            />
                                        </div>
                                        <span className={styles.utilizationText}>{`${(station.total_slots - station.available_slots) / station.total_slots * 100}%`}</span>
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
