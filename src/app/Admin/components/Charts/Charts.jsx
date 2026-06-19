import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './charts.module.css';


const ChartData = [
  { month: 'Jan', revenue: 32000, expenses: 21000, profit: 11000 },
  { month: 'Feb', revenue: 28000, expenses: 20000, profit: 8000 },
  { month: 'Mar', revenue: 35000, expenses: 24000, profit: 11000 },
  { month: 'Apr', revenue: 42000, expenses: 27000, profit: 15000 },
  { month: 'May', revenue: 48000, expenses: 30000, profit: 18000 },
  { month: 'Jun', revenue: 52000, expenses: 33000, profit: 19000 },
  { month: 'Jul', revenue: 50000, expenses: 32000, profit: 18000 },
  { month: 'Aug', revenue: 47000, expenses: 31000, profit: 16000 },
  { month: 'Sep', revenue: 54000, expenses: 34000, profit: 20000 },
  { month: 'Oct', revenue: 62000, expenses: 38000, profit: 24000 },
  { month: 'Nov', revenue: 78000, expenses: 45000, profit: 33000 },
  { month: 'Dec', revenue: 90000, expenses: 52000, profit: 38000 },
];

const Chart = () => {
  return (
    <div id="analytics" className={styles.chartContainer}>
      <div className={styles.headerSection}>
        <div className={styles.titleWrapper}>
          Revenue Chart
          <span className={styles.subtitle}>monthly revenue and expenses</span>
        </div>

        <div className={styles.legendWrapper}>
          <div className={styles.legendItem}>
            <div className={styles.bulletRevenue}></div>
            <h5>Revenue</h5>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.bulletExpenses}></div>
            <h5>Expenses</h5>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.bulletProfit}></div>
            <h5>Profit</h5>
          </div>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ChartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Bar
              dataKey="revenue"
              fill="#c58722"
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
            <Bar
              dataKey="expenses"
              fill="#1d4dd1"
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
            <Bar
              dataKey="profit"
              fill="#22C55E"
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;