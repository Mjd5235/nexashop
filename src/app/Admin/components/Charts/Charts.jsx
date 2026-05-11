"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", revenue: 32000, expenses: 22000, },
  { month: "Feb", revenue: 28000, expenses: 21000, },
  { month: "Mar", revenue: 35000, expenses: 24000, },
  { month: "Apr", revenue: 42000, expenses: 27000, },
  { month: "May", revenue: 48000, expenses: 30000, },
  { month: "Jun", revenue: 52000, expenses: 33000, },
  { month: "Jul", revenue: 50000, expenses: 32000, },
  { month: "Aug", revenue: 47000, expenses: 31000, },
  { month: "Sep", revenue: 54000, expenses: 34000, },
  { month: "Oct", revenue: 62000, expenses: 38000, },
  { month: "Nov", revenue: 78000, expenses: 45000, },
  { month: "Dec", revenue: 90000, expenses: 52000, },
];

const ChartData = data.map((item) => ({
  ...item,
  profit: item.revenue - item.expenses
}))

export default function Charts() {
  return (
    <div style={{ backgroundColor: "#fff", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", marginTop: "30px", borderRadius: "16px", height: "400px", width: "910px", marginLeft: "149px", display: "grid", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

      <div style={{ display: "flex", }}>

        <span style={{ color: "#1a1a1a", display: 'grid', marginTop: "50px", marginLeft: "40px", fontSize: "20px", fontWeight: "bold" }}>Revenue Chart: <span style={{ color: "gray", marginTop: "8px", fontSize: "13px", fontWeight: "normal" }}>monthly revenue and expenses</span></span>

        <div style={{ display: "flex", marginLeft: "400px", marginTop: "50px", }}>
          <div style={{ border: "solid 8px #c58722", width: "15px", height: "15px", borderRadius: "20px" }}></div><h5 style={{ color: "#1a1a1a", marginLeft: "5px", marginRight: "20px" }}>Revenue</h5>
          <div style={{ border: "solid 8px #1d4dd1", width: "15px", height: "15px", borderRadius: "20px", color: "#1a1a1a", }}></div><h5 style={{ color: "#1a1a1a", marginLeft: "5px", marginRight: "20px" }}>Expenses</h5>
          <div style={{ border: "solid 8px #22C55E", width: "15px", height: "15px", borderRadius: "20px", color: "#1a1a1a", }}></div><h5 style={{ color: "#1a1a1a", marginLeft: "5px", marginRight: "20px" }}>Profit</h5>
        </div>
      </div>

      <div style={{ width: "910px", height: "300px", padding: "15px", marginTop: "25px" }}>

        <ResponsiveContainer>
          <BarChart data={ChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "white", border: "none", borderRadius: "8px", }} />
            <Bar barCategoryGap="30%" radius={[6, 6, 0, 0]} dataKey="revenue" fill="#c58722" />
            <Bar barCategoryGap="30%" radius={[6, 6, 0, 0]} dataKey="expenses" fill="#1d4dd1" />
            <Bar barCategoryGap="30%" radius={[6, 6, 0, 0]} dataKey="profit" fill="#22C55E" />
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}