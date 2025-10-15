import Navbar from "../../components/Navbar/Navbar"; // (sidebar)
import Header from "../../components/Header/Header"; // (top bar)
import "../../app/layout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex" }}>
            <Navbar /> {/* Sidebar navigation */}
            <div style={{ marginLeft: "70px", flex: 1 }}>
                <Header /> {/* Top bar */}
                <main style={{ padding: "20px" }}>{children}</main>
            </div>
        </div>
    );
}
