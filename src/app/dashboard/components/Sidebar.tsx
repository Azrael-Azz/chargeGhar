"use client"
export function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ")
}

import { useState } from "react"
import Link from "next/link"
import {
    Home,
    MapPin,
    Users,
    CreditCard,
    Settings,
    Menu,
    LogOut,
} from "lucide-react"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Stations", href: "/dashboard/stations", icon: MapPin },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function Sidebar() {
    const [expanded, setExpanded] = useState(false)

    return (
        <aside
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            className={cn(
                "fixed left-0 top-0 h-screen z-40 bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between transition-all duration-300 ease-in-out",
                expanded ? "w-56" : "w-20"
            )}
        >
            {/* --- Logo Section --- */}
            <div className="flex flex-col items-center gap-4 mt-4 px-4">
                <div className="flex items-center justify-center w-full">
                    <div className="flex items-center gap-2">
                        <Menu className="w-6 h-6 text-primary" />
                        {expanded && (
                            <span className="text-lg font-semibold text-gray-800">
                                Charge Ghar
                            </span>
                        )}
                    </div>
                </div>

                {/* --- Navigation --- */}
                <nav className="flex flex-col mt-8 w-full">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl p-3 my-1 text-gray-600 hover:bg-gray-100 transition-colors",
                                    expanded ? "justify-start px-4" : "justify-center"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {expanded && <span className="text-sm">{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* --- Bottom Actions --- */}
            <div
                className={cn(
                    "flex items-center p-4 text-gray-500 hover:text-red-600 cursor-pointer border-t border-gray-100",
                    expanded ? "justify-start gap-3" : "justify-center"
                )}
            >
                <LogOut className="w-5 h-5" />
                {expanded && <span className="text-sm font-medium">Logout</span>}
            </div>
        </aside>
    )
}
