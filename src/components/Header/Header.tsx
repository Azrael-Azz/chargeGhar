"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut } from "react-icons/fi";
import logo from "../../../public/ChargeGharLogo.png";
import Notifications from "../notifications/notifications";

const Header: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProfileClick = () => {
        setDropdownOpen(false);
        router.push("/dashboard/profile");
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", { method: "POST" });
            if (!response.ok) throw new Error("Logout request failed");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setDropdownOpen(false);
        }
    };

    return (
        <header className={styles.header}>
            {/* Logo Section */}
            <div className={styles.logoContainer}>
                <Image src={logo} alt="ChargeGhar Logo" className={styles.logo} priority />
            </div>

            {/* Right Section */}
            <div className={styles.rightSection}>
                <Notifications />

                {/* Profile Dropdown */}
                <div className={styles.profileWrapper} ref={dropdownRef}>
                    <div className={styles.profile} onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <FiUser />
                    </div>

                    {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <button onClick={handleProfileClick}>
                                <FiUser className={styles.dropdownIcon} /> Profile
                            </button>
                            <button onClick={handleLogout}>
                                <FiLogOut className={styles.dropdownIcon} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
