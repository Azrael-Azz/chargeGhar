"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./notifications.module.css";
import { FiMoreVertical, FiBell } from "react-icons/fi";

const Notifications: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
    const popupRef = useRef<HTMLDivElement>(null);

    const notifications = [
        { id: 1, text: "User phone_no has not returned power bank in time.", time: "30 min", unread: true },
    ];

    const filtered = activeTab === "unread"
        ? notifications.filter((n) => n.unread)
        : notifications;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.container} ref={popupRef}>
            {/* Bell icon triggers popup */}
            <button className={styles.iconButton} onClick={() => setIsOpen(!isOpen)}>
                <FiBell />
                <Notifications />
            </button>

            {isOpen && (
                <div className={styles.popup}>
                    <div className={styles.header}>
                        <h3>Notifications</h3>
                        <FiMoreVertical />
                    </div>

                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
                            onClick={() => setActiveTab("all")}
                        >
                            All
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === "unread" ? styles.active : ""}`}
                            onClick={() => setActiveTab("unread")}
                        >
                            Unread
                        </button>
                    </div>

                    <div className={styles.list}>
                        {filtered.map((n) => (
                            <div key={n.id} className={styles.notification}>
                                <span className={`${styles.dot} ${n.unread ? styles.activeDot : ""}`}></span>
                                <div className={styles.text}>
                                    <p>{n.text}</p>
                                    <span>{n.time}</span>
                                </div>
                                <FiMoreVertical className={styles.moreIcon} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
