"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./categoryChart.module.css";

const data = [
  { name: "Phones", value: 35, color: "#3b82f6" },
  { name: "Tablets", value: 15, color: "#22c55e" },
  { name: "Computers", value: 20, color: "#f59e0b" },
  { name: "Displays", value: 10, color: "#ef4444" },
  { name: "Watches", value: 8, color: "#8b5cf6" },
  { name: "Headphones", value: 12, color: "#06b6d4" }
];

export default function CategoryChart() {
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.title}>
        Sales by Category
      </h3>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="90%" height="90%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="none"
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
