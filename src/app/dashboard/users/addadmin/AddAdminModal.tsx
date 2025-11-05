"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaRegImage } from "react-icons/fa6";
import styles from "./AddAdminModal.module.css";

export default function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [isActive, setIsActive] = useState(true);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [recentProfiles, setRecentProfiles] = useState<string[]>([]);

  // Handle uploaded image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        setProfileImage(imageData);
        setRecentProfiles((prev) => [imageData, ...prev.slice(0, 2)]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* --- MAIN ADD ADMIN POPUP --- */}
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {/* Clickable Profile Icon */}
          <div
            className={styles.profileIcon}
            onClick={() => setShowProfilePopup(true)}
          >
            <div className={styles.iconCircle}>
              {profileImage ? (
                <>
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={90}
                    height={90}
                    className={styles.recentImg}
                  />
                  <div className={styles.editOverlay}>Edit</div>
                </>
              ) : (
                <>
                  👤
                  <div className={styles.editOverlay}>Edit</div>
                </>
              )}
            </div>
          </div>

          <h2 className={styles.title}>Personal Information</h2>

          <form className={styles.form}>
            <div className={styles.row}>
              <label>
                Name
                <input type="text" placeholder="<username>" />
              </label>

              <label>
                Role
                <select>
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </label>
            </div>

            <div className={styles.row}>
              <label>
                Email Address
                <input type="email" placeholder="<emailaddress>" required />
              </label>

              <label>
                Phone Number
                <input type="tel" placeholder="<phoneno>" required />
              </label>
            </div>

            <label>
              Password
              <input type="password" placeholder="<password>" required />
            </label>

            <div className={styles.statusRow}>
              <span>Status</span>
              <div
                className={`${styles.toggle} ${isActive ? styles.active : ""}`}
                onClick={() => setIsActive(!isActive)}
              >
                <div className={styles.knob}></div>
              </div>
              <span
                className={`${styles.statusText} ${isActive ? styles.activeText : ""
                  }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className={styles.access}>
              <span>Access Level</span>
              <div className={styles.accessGrid}>
                <label><input type="checkbox" /> Station</label>
                <label><input type="checkbox" /> Transactions</label>
                <label><input type="checkbox" /> Users</label>
                <label><input type="checkbox" /> Settings</label>
                <label><input type="checkbox" /> Rentals</label>
              </div>
            </div>

            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className={styles.createBtn}>
                Create Admin
              </button>
            </div>
          </form>
        </div >
      </div >

      {/* --- PROFILE PICTURE POPUP --- */}
      {
        showProfilePopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <h3>Change your Profile Picture</h3>
              <p className={styles.subText}>Select an Image</p>

              <div className={styles.popupOptions}>
                {/* Choose an image */}
                <label className={styles.optionBox}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <div>
                    <p className={styles.optionIcon}><FaRegImage />
                    </p>
                    <p>Choose an Image</p>
                  </div>
                </label>
              </div>

              {/* Recent Profiles */}
              <div className={styles.recentSection}>
                <p>Recent Profiles</p>
                <div className={styles.recentList}>
                  {recentProfiles.length > 0 ? (
                    recentProfiles.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt="Recent"
                        width={60}
                        height={60}
                        className={styles.recentImg}
                        onClick={() => setProfileImage(img)}
                      />
                    ))
                  ) : (
                    <div className={styles.emptyCircle}></div>
                  )}
                </div>
              </div>

              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowProfilePopup(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.confirmBtn}
                  onClick={() => setShowProfilePopup(false)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}