"use client"

import { useState } from "react";
import Modal from "../../../components/modal/modal";
import styles from "./settings.module.css";
import { FiEdit, FiTrash2, FiPlus, FiUser, FiLock } from "react-icons/fi";

export default function SettingsPage() {
    // ================= STATE =================
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [selectedSection, setSelectedSection] = useState("");

    const [packages] = useState([
        { id: 1, name: "1 Hour Package", duration: "1 Hour", price: "₹100", active: true },
        { id: 2, name: "1 Day Package", duration: "1 Day", price: "₹500", active: false },
    ]);

    const [coupons] = useState([
        { id: 1, code: "SAVE10", discount: "10%", status: "Active" },
        { id: 2, code: "FREEDAY", discount: "100%", status: "Expired" },
    ]);

    const [achievements] = useState([
        { id: 1, name: "Make First Purchase", points: 100, difficulty: "Easy", active: true },
    ]);

    const [admin, setAdmin] = useState({
        userId: "A1029",
        name: "Admin User",
        email: "mah******60@gmail.com",
        phone: "98******51",
    });

    // ================= HANDLERS =================
    const handleOpenModal = (title: string, section: string) => {
        setModalTitle(title);
        setSelectedSection(section);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleEdit = (field: keyof typeof admin) => {
        const newValue = prompt(`Enter new ${field}:`, admin[field]);
        if (newValue) {
            setAdmin({ ...admin, [field]: newValue });
        }
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const current = form.current.value;
        const newPass = form.new.value;
        const confirm = form.confirm.value;

        if (newPass !== confirm) {
            alert("New passwords do not match!");
            return;
        }

        alert("Password updated successfully!");
        handleCloseModal();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>Manage system configurations</p>

            {/* ================= PACKAGES SECTION ================= */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Packages</h2>
                    <button
                        className={styles.addButton}
                        onClick={() => handleOpenModal("Add Package", "package")}
                    >
                        <FiPlus /> Add Package
                    </button>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Package ID</th>
                            <th>Package Name</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg.id}>
                                <td>{pkg.id}</td>
                                <td>{pkg.name}</td>
                                <td>{pkg.duration}</td>
                                <td>{pkg.price}</td>
                                <td>
                                    <span
                                        className={`${styles.status} ${pkg.active ? styles.active : styles.inactive
                                            }`}
                                    >
                                        {pkg.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td>
                                    <button className={styles.editBtn}><FiEdit /></button>
                                    <button className={styles.deleteBtn}><FiTrash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* ================= COUPONS SECTION ================= */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Coupons</h2>
                    <button
                        className={styles.addButton}
                        onClick={() => handleOpenModal("Add Coupon", "coupon")}
                    >
                        <FiPlus /> Add Coupon
                    </button>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Coupon ID</th>
                            <th>Coupon Code</th>
                            <th>Discount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.code}</td>
                                <td>{c.discount}</td>
                                <td>
                                    <span
                                        className={`${styles.status} ${c.status === "Active" ? styles.active : styles.inactive
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </td>
                                <td>
                                    <button className={styles.editBtn}><FiEdit /></button>
                                    <button className={styles.deleteBtn}><FiTrash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* ================= ACHIEVEMENTS SECTION ================= */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Achievements and Points Assignment</h2>
                    <div className={styles.headerActions}>
                        <button
                            className={styles.addButton}
                            onClick={() => handleOpenModal("Assign Points", "points")}
                        >
                            <FiPlus /> Assign Points
                        </button>
                        <button
                            className={styles.addButton}
                            onClick={() => handleOpenModal("Add Achievement", "achievement")}
                        >
                            <FiPlus /> Add Achievement
                        </button>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Achievement ID</th>
                            <th>Achievement Name</th>
                            <th>Points Assigned</th>
                            <th>Difficulty</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {achievements.map((a) => (
                            <tr key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.points} pts</td>
                                <td>{a.difficulty}</td>
                                <td>
                                    <span
                                        className={`${styles.status} ${a.active ? styles.active : styles.inactive
                                            }`}
                                    >
                                        {a.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td>
                                    <button className={styles.editBtn}><FiEdit /></button>
                                    <button className={styles.deleteBtn}><FiTrash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className={styles.profileSection}>
                <h2 className={styles.profileTitle}>Admin Profile Update</h2>

                <div className={styles.profileContainer}>
                    {/* LEFT CARD */}
                    <div className={styles.leftCard}>
                        <div className={styles.profileTop}>
                            <div className={styles.avatar}>
                                <FiUser className={styles.profileIcon} />
                            </div>
                            <div className={styles.profileHeader}>
                                <h3>{admin.name}</h3>
                                <button className={styles.editProfileBtn}>
                                    <FiEdit /> Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className={styles.profileDetails}>
                            <div className={styles.profileRow}>
                                <span>User ID:</span>
                                <span>{admin.userId}</span>
                            </div>

                            <div className={styles.profileRow}>
                                <span>Username:</span>
                                <span>{admin.name}</span>
                                <button
                                    className={styles.inlineEdit}
                                    onClick={() => handleEdit("name")}
                                >
                                    <FiEdit />
                                </button>
                            </div>

                            <div className={styles.profileRow}>
                                <span>Email:</span>
                                <span>{admin.email}</span>
                                <button
                                    className={styles.inlineEdit}
                                    onClick={() => handleEdit("email")}
                                >
                                    <FiEdit />
                                </button>
                            </div>

                            <div className={styles.profileRow}>
                                <span>Phone:</span>
                                <span>{admin.phone}</span>
                                <button
                                    className={styles.inlineEdit}
                                    onClick={() => handleEdit("phone")}
                                >
                                    <FiEdit />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className={styles.rightCard}>
                        <h3 className={styles.authTitle}>
                            <FiLock /> Password and Authentication
                        </h3>
                        <button
                            className={styles.changePassBtn}
                            onClick={() => handleOpenModal("Change Password", "password")}
                        >
                            Change Password
                        </button>


                        <div className={styles.authBox}>
                            <h4>Email Authentication</h4>
                            <p>
                                Verify your authentication using Gmail. Your current email account is:{" "}
                                <span className={styles.bold}>{admin.email}</span>
                            </p>
                            <div className={styles.active}>
                                <label>Active Authentication</label>
                            </div>
                        </div>

                        <div className={styles.authBox}>
                            <h4>SMS Authentication</h4>
                            <p>
                                Verify using SMS sent to your phone number. Your current phone number is:{" "}
                                <span className={styles.bold}>{admin.phone}</span>
                            </p>
                            <div className={styles.deactivate}>
                                <label>Deactivate SMS Authentication</label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= MODAL SECTION ================= */}
            <Modal title={modalTitle} isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedSection === "package" && (
                    <>
                        <label>Package Name</label>
                        <input type="text" placeholder="Enter package name" />
                        <label>Duration</label>
                        <input type="text" placeholder="Enter duration" />
                        <label>Price</label>
                        <input type="text" placeholder="Enter price" />
                        <button className={styles.saveBtn}>Save</button>
                    </>
                )}

                {selectedSection === "coupon" && (
                    <>
                        <label>Coupon Code</label>
                        <input type="text" placeholder="Enter coupon code" />
                        <label>Discount (%)</label>
                        <input type="text" placeholder="Enter discount" />
                        <button className={styles.saveBtn}>Save</button>
                    </>
                )}

                {selectedSection === "achievement" && (
                    <>
                        <label>Achievement Name</label>
                        <input type="text" placeholder="Enter achievement name" />
                        <label>Points</label>
                        <input type="text" placeholder="Enter points" />
                        <label>Difficulty</label>
                        <select>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                        <button className={styles.saveBtn}>Save</button>
                    </>
                )}

                {selectedSection === "points" && (
                    <>
                        <label>User Email</label>
                        <input type="email" placeholder="Enter user email" />
                        <label>Points Amount</label>
                        <input type="number" placeholder="Enter points amount" />
                        <label>Description (optional)</label>
                        <input type="text" placeholder="Reason for assigning points" />
                        <button className={styles.saveBtn}>Assign Points</button>
                    </>
                )}


                {selectedSection === "password" && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const current = (e.currentTarget.elements.namedItem("current") as HTMLInputElement).value;
                            const newPass = (e.currentTarget.elements.namedItem("new") as HTMLInputElement).value;
                            const confirm = (e.currentTarget.elements.namedItem("confirm") as HTMLInputElement).value;

                            if (newPass !== confirm) {
                                alert("New passwords do not match!");
                                return;
                            }

                            alert("Password updated successfully!");
                            handleCloseModal();
                        }}
                    >
                        <label>Current Password</label>
                        <input name="current" type="password" placeholder="Enter current password" />

                        <label>New Password</label>
                        <input name="new" type="password" placeholder="Enter new password" />

                        <label>Confirm New Password</label>
                        <input name="confirm" type="password" placeholder="Confirm new password" />

                        <button type="submit" className=".changePassBtn">Update Password</button>
                    </form>
                )}

            </Modal>
        </div>
    );
}
