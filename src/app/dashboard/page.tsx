"use client";

import Navbar from "./components/Navbar";

import React from "react";
import styles from "./dashboard.module.css";
import { FiUsers, FiDollarSign, FiCheckCircle, FiAlertCircle, FiUserPlus } from "react-icons/fi";
import StatsCard from "./components/StatsCard";
import RevenueChart from "./components/RevenueChart";
import StationUtilizationChart from "./components/StationUtilizationChart";

const Dashboard: React.FC = () => {
    return (
        <div className={styles.dashboardPage}>
            <div className={styles.dashboardContainer}>
                <Navbar />

                <div className={styles.content}>
                    <h1 className={styles.title}>Dashboard</h1>
                    <span className={styles.welcomeText}>
                        Welcome back, <span className={styles.adminName}>Admin</span>
                    </span>

                    {/* Stats Cards */}
                    <section className={styles.statsSection}>
                        <StatsCard icon={<FiDollarSign />} title="Revenue Today" value="Rs.72,000" />
                        <StatsCard icon={<FiCheckCircle />} title="Stations Active" value="38" />
                        <StatsCard icon={<FiUsers />} title="Total Users" value="12,974" />
                        <StatsCard icon={<FiUserPlus />} title="Admin Users" value="5" />
                        <StatsCard icon={<FiAlertCircle />} title="Pending Issues" value="5" />
                    </section>

                    <div className={styles.grid}>
                        <RevenueChart />
                    </div>

                    <StationUtilizationChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
