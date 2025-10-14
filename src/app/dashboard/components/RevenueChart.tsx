"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 5200 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 6000 },
    { month: "May", revenue: 7100 },
    { month: "Jun", revenue: 6600 },
    { month: "Jul", revenue: 4000 },
    { month: "Aug", revenue: 5200 },
    { month: "Sep", revenue: 4800 },
    { month: "Oct", revenue: 6000 },
    { month: "Nov", revenue: 7100 },
    { month: "Dec", revenue: 6600 },
];

const RevenueChart: React.FC = () => {
    return (
        <div
            style={{
                width: "100%",
                height: 320,
                background: "#121212",
                borderRadius: "12px",
                padding: "5rem",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
        >
            <h3 style={{ color: "#82ea80", marginBottom: "1rem" }}>Revenue Generated</h3>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                        contentStyle={{
                            background: "#0b0b0b",
                            border: "1px solid #47b216",
                            color: "#fff",
                        }}
                        labelStyle={{ color: "#82ea80" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#47b216"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#82ea80" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
