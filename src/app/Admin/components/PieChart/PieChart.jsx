"use client"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Phones", value: 35, color: "#3b82f6", },
  { name: "Tablets", value: 15, color: "#22c55e", },
  { name: "Computers", value: 20, color: "#f59e0b", },
  { name: "Displays", value: 10, color: "#ef4444", },
  { name: "Watches", value: 8, color: "#8b5cf6", },
  { name: "Headphones", value: 12, color: "#06b6d4" }
];

export default function CategoryChart() {
  return (
    <div
      style={{ background: "#fff", padding: "20px", borderRadius: "12px", width: "450px", height: "400px", marginTop: "30px", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", marginLeft: "35px" }}>
      <h3 style={{ color: "#1a1a1a", marginBottom: "25px", marginTop: "10px", marginLeft: "10px" }}>
        Sales by Category
      </h3>

      <PieChart width={400} height={260}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.color}
            />
          ))}
        </Pie>

        <Tooltip contentStyle={{ borderColor: "#bbb", borderRadius: "8px", }} />

        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
        />
      </PieChart>

    </div>
  );
}