import React from 'react'
import Image from 'next/image'

export default function TopPro() {

    const Data = [
        { id: 1, name: "iPhone 15 Pro Max", revenue: "2,987,530 SAR", sales: "139", per: "12%", categ: "Phones", space: "-20px" },
        { id: 2, name: "Macbook Pro M1", revenue: "2,562,044 SAR", sales: "125", per: "8%", categ: "Computers", space: "-15px" },
        { id: 3, name: "iPad Pro with Keyboard Case", revenue: "1,953,229 SAR", sales: "109", per: "7%", categ: "Tablets", space: "-103px" },
    ]

    return (
        <div style={{ width: "910px", backgroundColor: "#fff", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", borderRadius: "16px", height: '390px', marginLeft: "150px", marginTop: "40px" }}>
            <span style={{ color: "#1a75e8", display: 'grid', paddingTop: "30px", paddingLeft: "50px", fontSize: "20px", fontWeight: "bold", borderBottom: "solid 1px #dddddd", paddingBottom: "20px" }}>Top Products: <span style={{ color: "gray", marginTop: "8px", fontSize: "13px", fontWeight: "normal" }}>Best performing products</span></span>
            <div style={{ marginLeft: "50px", color: "#fff", fontWeight: "500", display: "grid", alignContent: "center", alignItems: "center", width: "910px", }}>
                <div style={{ display: "grid", marginTop: '30px' }}>
                    {Data.map(product => (
                        <div key={product.id} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "15px", marginLeft: "0px", marginRight: "90px", paddingTop: "10px", color: "#1a1a1a", marginBottom: "10px", borderRadius: "16px" }}>
                            <span style={{ marginLeft: "10px", display: "grid", fontWeight: "bold", cursor: "default" }}>{product.name}<span style={{ marginTop: "15px", fontWeight: "normal", color: "gray" }}>{product.sales} sales</span></span>
                            <span style={{ marginLeft: product.space, fontWeight: "bold", display: "grid", cursor: "default" }}>{product.revenue}<span style={{ color: "#22C55E", marginTop: "7px" }}><Image style={{ marginBottom: "-10px", marginRight: "5px", }} src={'/Admin/Icons/up.svg'} width={30} height={30} alt='user' key={100} />+{product.per}</span></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}