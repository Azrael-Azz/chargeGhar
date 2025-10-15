"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    { name: "City Mall", value: 40 },
    { name: "Airport", value: 30 },
    { name: "Downtown", value: 20 },
    { name: "University", value: 10 },
];

const COLORS = ["#47b216", "#82ea80", "#66bb6a", "#3c8c3c"];

const StationUtilizationChart: React.FC = () => {
    return (
        <div
            style={{
                width: "100%",
                height: 320,
                background: "#121212",
                borderRadius: "12px",
                padding: "1rem",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
        >
            <h3 style={{ color: "#82ea80", marginBottom: "1rem" }}>Station Utilization</h3>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#47b216"
                        dataKey="value"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: "#0b0b0b",
                            border: "1px solid #47b216",
                            color: "#fff",
                        }}
                    />
                    <Legend wrapperStyle={{ color: "#ccc" }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StationUtilizationChart;
