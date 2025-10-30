"use client";

import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { FiUser } from "react-icons/fi";

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        userId: "A1029",
        username: "admin_user",
        email: "admin@email.com",
        phone: "9876543210",
        role: "Admin",
        lastLogin: "14 Sept 2025, 10:30 AM",
        passwordChanged: "5 days ago",
    });

    const [editedProfile, setEditedProfile] = useState({ ...profile });
    const [hasChanges, setHasChanges] = useState(false);

    // Track unsaved changes
    useEffect(() => {
        const changed = JSON.stringify(profile) !== JSON.stringify(editedProfile);
        setHasChanges(changed);
    }, [editedProfile, profile]);

    const handleChange = (field: keyof typeof editedProfile, value: string) => {
        setEditedProfile({ ...editedProfile, [field]: value });
    };

    const handleCancel = () => {
        setEditedProfile(profile);
    };

    const handleConfirm = () => {
        alert("Changes confirmed! (Email/Phone verification coming soon)");
        setProfile(editedProfile);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Profile</h1>
            <p className={styles.pageSubtitle}>Manage your profile.</p>

            {/* Profile Header */}
            <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                    <FiUser className={styles.avatarIcon} />
                </div>
                <div className={styles.profileNameCard}>
                    <span className={styles.profileName}>{profile.username}</span>
                    <span className={styles.profileRole}>User Role: {profile.role}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.profileContent}>
                {/* Left Card */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Admin Profile</h3>
                    <div className={styles.formGroup}>
                        <label>User ID:</label>
                        <input type="text" value={profile.userId} disabled />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={editedProfile.username}
                            onChange={(e) => handleChange("username", e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={editedProfile.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Phone:</label>
                        <input
                            type="text"
                            value={editedProfile.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>
                </div>

                {/* Right Card */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Recent Activity</h3>
                    <p>Last login: {profile.lastLogin}</p>
                    <p>Password changed: {profile.passwordChanged}</p>
                </div>
            </div>

            {/* Unsaved Changes Card */}
            {hasChanges && (
                <div className={styles.unsavedChanges}>
                    <span>Careful, You have unsaved changes!</span>
                    <div className={styles.actionButtons}>
                        <button className={styles.cancelBtn} onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className={styles.confirmBtn} onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
