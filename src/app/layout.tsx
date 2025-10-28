// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "ChargeGhar Dashboard",
  description: "Admin dashboard for ChargeGhar EV platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex" }}>
          <Navbar /> {/* Sidebar navigation */}
          <div style={{ marginLeft: "70px", flex: 1 }}>
            <Header /> {/* Top bar */}
            <main style={{ marginTop: "70px", padding: "20px" }}>{children}</main>
          </div>
        </div>


      </body>
    </html>
  );
}
