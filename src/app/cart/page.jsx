"use client";
import React, { useEffect, useState } from "react";
import styles from './page.module.css'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Image from 'next/image'
import Link from "next/link";

export default function Page() {

  const [data6, setData6] = useState([]);
  const [logged, setLogged] = useState(false)
  const [selectedColor, setSelectedColor] = useState({});

    useEffect((index) => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setData6(cartItems)
    }, []);

  
  const removeFromCart = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    setData6([...cart]);
};


const removeCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice("cart");
  localStorage.setItem("cart", JSON.stringify(cart));

  setData6([...cart]);
}


  const increaseQty = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity < 3) {
      cart[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      setData6([...cart]);
    }
  };
  

const decreaseQty = (index) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 0) {
    cart[index].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    setData6([...cart]);
  }
    if(cart[index].quantity === 0){
  cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    setData6([...cart]);
  }
};


const CheckedOut = () =>{
  if(logged === true){alert("Checked Out Successfully.")}else{alert("Please log in to continue to checkout.")}
}


const totalPrice = data6.reduce((acc, item) => {
  const shipping = 12;
  const price = Number(item.price);
  const quantity = Number(item.quantity);

  return acc + price * quantity + shipping
}, 0);

const ProductTotal = Number(totalPrice.toFixed(2))



const finalPrice = Number(totalPrice.toFixed(2))


useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"))
  if(user){
    setLogged(true)
  }
})



const responsiveStyles = `
@media (max-width: 768px) {
body{
overflow-y: hidden;
}
  /* جعل عنصر المنتج يتحول لعمودي */
  .cart-item {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    align-items: center !important;
    text-align: center !important;
  }

  /* الصورة تصير أكبر */
.cart-image {
  width: 100% !important;
  max-width: 260px !important;
  height: auto !important;
  border-radius: 12px !important;
}


  /* تفاصيل المنتج */
  .cart-details {
    margin-left: 0 !important;
    align-items: center !important;
  }

  /* الأسعار تصير تحت */
  .cart-prices {
    text-align: center !important;
  }

  /* أزرار Delete All + Checkout تتكدس فوق بعض */
  .cart-actions {
    flex-direction: column !important;
    gap: 20px !important;
  }

  /* الزرين يصيرون أعرض */
  .cart-actions button {
    width: 90% !important;
  }

  h1 {
    font-size: 32px !important;
  }
}
`;



return (
    <div>
      <Header/>

      <style>{responsiveStyles}</style>

      <h1
        style={{
          textAlign: "center",
          fontSize: "52px",
          marginBottom: "70px",
          paddingTop: "115px",
          fontWeight: "700",
          letterSpacing: "1px",
          color: "#111",
          background: "linear-gradient(90deg, #111, #444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          animation: "fadeIn 0.8s ease",
        }}
      >
  🛒 Cart
      </h1>

      {Array.isArray(data6) && data6.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {data6.map((img, index) => (
            <li
              key={img.page}
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr 150px",
                gap: "20px",
                padding: "20px 0",
                borderBottom: "1px solid #ccc",
                alignItems: "center",
                
              }} className="cart-item"
            >
              
              <div style={{display: "flex",justifyContent: "center", alignContent: "center", alignItems: "center"}}>
                <Link href={`/product/${img.page}`}>
                <Image
                  src={img.image}
                  alt={img.title}
                  width={img.width}
                  height={img.height}
                  className="cart-image" 
                  style={{
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
                </Link>
              </div>

                <div  className="cart-details" style={{ display: "flex", flexDirection: "column" , marginLeft: "60px"}}>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "22px",
                      fontWeight: "600",
                    }}
                  >

                  <Link href={`/product/${img.page}`}>
                    {img.title}{" "}
                  </Link>
                  
                  {selectedColor[index] && (
                    <span style={{ fontSize: "16px", color: "#171717" }}>
                      ({selectedColor[index]})
                    </span>
                  )}
                </h2>

              <p style={{ margin: "8px 0", color: "#555" }}>
                Delivery by <b>{img.date}</b>
              </p>

              <div style={{ marginTop: "15px" }}>
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "14px",
                    color: "#555",
                  }}
                >
                  Choose Color:
                </p>

              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { id: "black", src: "/colors/00.png" },
                  { id: "white", src: "/colors/01.jfif" },
                  { id: "sky", src: "/colors/02.png" },
                ].map((color) => (
                  <img
                    key={color.id}
                    src={color.src}
                    onClick={() =>
                      setSelectedColor({
                        ...selectedColor,
                        [index]: color.id,
                      })
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      padding: "3px",
                      cursor: "pointer",
                      borderRadius: "8px",
                      transition: "0.2s",
                      transform:
                        selectedColor[index] === color.id ? "scale(1.07)" : "scale(1)",
                      border:
                        selectedColor[index] === color.id
                          ? "2px solid #1a75e8"
                          : "2px solid #ddd",
                      boxShadow:
                        selectedColor[index] === color.id
                          ? "0px 0px 6px rgba(0,0,0,0.2)"
                          : "none",
                      objectFit: "cover",
                      background: "white",
                    }}
                  />
                ))}
              </div>
            </div>

              <div
                style={{
                  marginTop: "15px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "#f7f7f7",
                  border: "1px solid #ddd",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px", color: "#444" }}>
                  <b>Warranty:</b> 12 months warranty included
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  borderRadius: "10px",
                  width: "120px",
                  height: "32px",
                  border: "1px solid #999",
                }}
              >
                <button
                  onClick={() => decreaseQty(index)}
                  style={{
                    width: "35px",
                    height: "100%",
                    background: "white",
                    border: "0",
                    borderRight: "1px solid #ccc",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  -
                </button>

                <div
                  style={{
                    width: "50px",
                    textAlign: "center",
                    lineHeight: "32px",
                  }}
                >
                  {img.quantity}
                </div>

                <button
                  onClick={() => increaseQty(index)}
                  style={{
                    width: "35px",
                    height: "100%",
                    background: "white",
                    border: "0",
                    borderLeft: "1px solid #ccc",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  +
                </button>
              </div>
            </div>

              <div className="cart-prices" style={{ textAlign: "right" , whiteSpace: "nowrap"}}>
                <p style={{ margin: 0, fontSize: "18px" }}>
                  Product: <b style={{whiteSpace: "nowrap"}}>{Number(img.price * img.quantity).toFixed(2)} SAR</b>
                </p>

                <p style={{ margin: "10px 30px 10px 0px" }}>
                  Shipping: <b>12 SAR</b>
                </p>

                <h3
                  style={{
                    marginTop: "18px",
                    color: "#171717",
                    fontSize: "24px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Total: {Number(img.price * img.quantity + 12).toFixed(2)} SAR
                </h3>
                <div className="del" style={{marginTop: "100px"}}>
                  <button style={{backgroundColor: "white", border: "solid 1px #1a1a1a", width: "58px", height: "35px", borderRadius: "10px", cursor: "pointer", }} onClick={()=>removeFromCart(index)}> <img src="https://cdn-icons-png.flaticon.com/512/484/484662.png" alt="Bin" width="16" height="17"/></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ textAlign: "center", marginTop: "200px" }}>
          <p style={{ fontSize: "20px" }}>
            Your cart is empty… add some items!
          </p>
        </div>
      )}

{data6.length > 0 && (
  <div className="cart-actions"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "900px",
      margin: "40px auto 60px auto",
    }}
  >

    <div style={{ textAlign: "right", fontSize: "23px", fontWeight: "600" }}>
      Total: {finalPrice} SAR
    </div>
    
    
    <button onClick={CheckedOut} className={styles.cartbut}>Checkout</button>

    
    <button
      onClick={() => removeCart()}
      style={{
        background: "#d32f2f",
        color: "white",
        padding: "14px 26px",
        fontSize: "16px",
        borderRadius: "10px",
        cursor: "pointer",
        border: "none",
        fontWeight: "600",
        letterSpacing: "0.5px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        transition: "0.25s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#b71c1c";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "#d32f2f";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      🗑️ Delete All
    </button>

  </div>
)}
      <div style={{marginTop: "135px"}}>
        <Footer />
      </div>
    </div>
  );

}