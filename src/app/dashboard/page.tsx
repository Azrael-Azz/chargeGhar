"use client";

import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { FiUsers, FiDollarSign, FiCheckCircle, FiAlertCircle, FiUserPlus } from "react-icons/fi";
import StatsCard from "../../components/StatsCard";
import AdminUsersCard from "../../components/AdminUsersCard/AdminUsersCard";
import StationsActiveCard from "../../components/StationsActiveCard/StationsActiveCard";
import DashboardStats from "../../components/DashboardStats/DashboardStats";
import RevenueChart from "../../components/RevenueChart";
import StationUtilizationChart from "../../components/StationUtilizationChart";
import Navbar from "../../components/Navbar/Navbar";
import instance from "@/lib/axios";
import axios from "axios";

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
                        <DashboardStats />
                        <AdminUsersCard />
                        <StationsActiveCard />
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
