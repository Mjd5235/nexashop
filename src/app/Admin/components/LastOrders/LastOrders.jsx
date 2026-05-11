import React from 'react'
import styles from './lastorders.module.css'

export default function LastOrders() {
    const Data = [
        { id: "#3847", space: "0px", space2: "10px", space3: "-25px", space4: "0px", customer: "John Smith", product: "iPhone 15 Pro Max", amount: "4,699.99 SAR", status: "completed", date: "2026-01-15", },
        { id: "#3848", space: "-2px", space2: "-20px", space3: "-30px", space4: "px", customer: "Sarah Johnson", product: "Folding Smartphone", amount: "5,249.99 SAR", status: "pending", date: "2026-01-14", },
        { id: "#3849", space: "-5px", space2: "10px", space3: "-37px", space4: "px", customer: "Mike Wilson", product: "Black Gaming Laptop", amount: "3,749.99 SAR", status: "cancelled", date: "2026-01-14", },
        { id: "#3850", space: "-40px", space2: "-12px", spacer3: "-24px", space4: "-26px", customer: "Emily Davis", product: "Apple Watch", amount: "999.99 SAR", status: "completed", date: "2026-01-14", },
    ]


    return (
        <div style={{ width: "910px", backgroundColor: "white", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", borderRadius: "16px", height: '470px', marginLeft: "150px", marginTop: "40px" }}>
            <span style={{ color: "#1a1a1a", display: 'grid', paddingTop: "30px", paddingLeft: "50px", fontSize: "20px", fontWeight: "bold" }}>Recent orders: <span style={{ color: "gray", marginTop: "8px", fontSize: "13px", fontWeight: "normal" }}>Latest customer orders</span></span>
            <div style={{ width: "790px", height: "50px", backgroundColor: "#1a1a1a", borderRadius: "8px", marginTop: "25px", marginLeft: "45px", marginBottom: "15px" }}>
                <div style={{ marginLeft: "10px", marginRight: "40px", paddingTop: "17px", color: "#fff", fontWeight: "500", display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}><span>Order ID</span><span style={{ marginLeft: "-60px" }}>Customer</span><span>Product</span><span>Amount</span><span>Status</span><span>Date</span></div>
            </div>
            <div style={{ marginLeft: "50px", color: "#1a1a1a", fontWeight: "500", display: "grid", alignContent: "center", alignItems: "center", width: "870px", }}>
                {Data.map(order => (
                    <div key={order.id} className={styles.order} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "15px", marginLeft: "0px", marginRight: "90px", borderBottom: "solid 1px gray", paddingTop: "25px" }}>
                        <span className={styles.ID} style={{ cursor: "pointer", marginLeft: "10px" }}>{order.id}</span><span style={{ marginLeft: order.space }}>{order.customer}</span><span style={{ marginLeft: order.space2, }}>{order.product}</span><span style={{ marginLeft: order.space3, marginRight: order.spacer3 }}>{order.amount}</span>
                        {order.status === "completed" && <span style={{ backgroundColor: "#22c55e", color: "#fff", fontSize: "15px", fontWeight: "600", padding: "7px", marginTop: "-5px", borderRadius: "5px", marginRight: order.space4 }}>{order.status}</span>} {order.status === "pending" && <span style={{ backgroundColor: "#f59e0b", color: "#fff", fontSize: "15px", fontWeight: "600", marginTop: "-5px", padding: " 7px", borderRadius: "5px", marginRight: "17px" }}>{order.status}</span>} {order.status === "cancelled" && <span style={{ backgroundColor: "#ef4444", color: "#fff", fontSize: "15px", fontWeight: "600", marginTop: "-5px", padding: " 7px", borderRadius: "5px", marginRight: "10px" }}>{order.status}</span>}
                        <span style={{ marginRight: "20px" }}>{order.date}</span>
                    </div>
                ))}

            </div>
        </div>
    )
}
