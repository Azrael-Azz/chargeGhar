// src/app/dashboard/layout.tsx
"use client";

import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.layout}>
            <Navbar />
            <div className={styles.main}>
                <Header />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
}
