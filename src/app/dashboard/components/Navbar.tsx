"use client";

import React from "react";
import Image from "next/image";
import { FiBell } from "react-icons/fi";
import styles from "./Navbar.module.css";
import logo from "../../../../public/ChargeGharLogo.png";

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            {/* Left: Logo */}
            <div className={styles.logoSection}>
                <Image src={logo} alt="Charge Ghar Logo" className={styles.logoImage} priority />
            </div>

            {/* Right: Actions */}
            <div className={styles.actions}>

                {/* Notifications */}
                <button className={styles.iconButton} aria-label="Notifications">
                    <FiBell />
                    <span className={styles.notificationDot}></span>
                </button>

                {/* Profile Avatar */}
                <div className={styles.profile}>
                    <Image
                        src=""
                        alt="Admin Profile"
                        width={40}
                        height={40}
                        className={styles.avatar}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
