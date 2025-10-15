"use client";

import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { FiBell, FiUser } from "react-icons/fi";
import logo from "../../../public/ChargeGharLogo.png";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            {/* Logo */}
            <div className={styles.logoContainer}>
                <Image src={logo} alt="ChargeGhar Logo" className={styles.logo} priority />
            </div>

            {/* Right side icons */}
            <div className={styles.rightSection}>
                <button className={styles.iconButton} aria-label="Notifications">
                    <FiBell />
                </button>
                <div className={styles.profile}>
                    <FiUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
