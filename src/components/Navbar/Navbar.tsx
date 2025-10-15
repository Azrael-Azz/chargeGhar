"use client";

import React, { useState } from "react";
import { FiHome, FiUsers, FiSettings, FiShoppingCart, FiBarChart2, FiMapPin } from "react-icons/fi";
import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar: React.FC = () => {
    const [hovered, setHovered] = useState(false);

    const navItems = [
        { icon: <FiHome />, label: "Dashboard", href: "/dashboard" },
        { icon: <FiMapPin />, label: "Stations", href: "/stations" },
        { icon: <FiUsers />, label: "Users", href: "/users" },
        { icon: <FiShoppingCart />, label: "Rentals", href: "/rentals" },
        { icon: <FiBarChart2 />, label: "Transactions", href: "/transactions" },
        { icon: <FiSettings />, label: "Settings", href: "/settings" },
    ];

    return (
        <nav
            className={`${styles.navbar} ${hovered ? styles.expanded : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <ul className={styles.navList}>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.href} className={styles.navItem}>
                            <span className={styles.icon}>{item.icon}</span>
                            {hovered && <span className={styles.label}>{item.label}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
