"use client";
import Image from "next/image";
import styles from './Products.module.css';
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function Watches() {

  const itemRefs = useRef([]);
  const [data5, setData5] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(({ data5, }) => {
        setData5(data5);
      });
  }, []);


  
const addToCart = (item, e) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(p => p.page === item.page);

  
  if (existing && existing.quantity >= 3) {
    alert("You have added maximum count of this product...")
    return;
  }

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));

  
  flyImage(item, e);
};


    
 const flyImage = (item, e) => {
  const imgRect = e.target.getBoundingClientRect();
  const flyImg = document.createElement("img");

  flyImg.src = item.image;
  flyImg.style.position = "fixed";
  flyImg.style.left = imgRect.left + "px";
  flyImg.style.top = imgRect.top + "px";
  flyImg.style.width = item.width + "px";
  flyImg.style.height = item.height + "px";
  flyImg.style.transition = "all 0.8s ease-in-out";
  flyImg.style.zIndex = 1000;

  document.body.appendChild(flyImg);

  const cartIcon = document.querySelector(".cartIcon");

  if (cartIcon) {
    const cartRect = cartIcon.getBoundingClientRect();

    setTimeout(() => {
      flyImg.style.left = cartRect.left + "px";
      flyImg.style.top = cartRect.top + "px";
      flyImg.style.width = "20px";
      flyImg.style.height = "20px";
      flyImg.style.opacity = 0;
    }, 10);

    setTimeout(() => flyImg.remove(), 900);
  }

  }

  return (
    <div style={{ position: "relative", margin: "0 auto", display: "grid",}}>

      <h2 style={{marginTop: "50px", marginBottom: "50px", textAlign: 'center', justifyContent: 'center', alignItems: "center", display: "flex"}}>Smart Watches and Headphones</h2>
      <ul className={styles.products} style={{ alignItems: "center", display: "flex", gap: "10px", margin: "0 auto" }}>
        {data5.map((img) => (
          <div key={img.page} className={styles.product} ref={el => itemRefs.current[img.id] = el}>
            <Link href={`/product/${img.page}`}>
              <li>
                {img.sale && <div style={{backgroundColor: "#1a75e8", color: "#fff", padding: "3px", position: "absolute", borderRadius: "4px", right: "-13px", top: "-8px"}}>sale</div>}
                <Image src={img.image} alt={img.title} width={img.width} height={img.height}/>
                <h3 className={styles.protitle}>{img.title}</h3>
                <p className={styles.prodes}>{img.description}</p>
                <div style={{display: "grid",height: "51px",marginTop: img.sale === true ? "0px" : "21px"}}>
                  {img.sale === true ? <div style={{display: "flex", fontWeight: "bold",fontSize: "13px",marginTop: "7px"}}>was:&nbsp;<h6 style={{textDecoration: "line-through", fontSize: "13px", }}>{img.was}</h6><h5 style={{marginTop: "6px", marginLeft: "2px", fontSize: "9px"}}>SAR</h5></div> : null}
                  <div style={{display: "flex", marginTop: "5px"}}><h4 className={styles.price} style={{fontSize: "20px"}}>{img.price}</h4><h5 style={{marginTop: "6px", marginLeft: "2px", fontSize: "12px"}}>SAR</h5></div>
                </div>
                <span style={{textAlign: "left", left: 0, fontSize: "13px", float: "left", display: "flex", marginTop: img.sale === true ? "20px" : "0px",}}>get it<span style={{fontWeight: "bold", paddingLeft: "3px"}}>{img.date}</span></span>
              </li>
            </Link>
            <button onClick={(e) => addToCart(img, e)} style={{border: "none", cursor: "pointer",marginTop: img.sale !== true ? "30px" : "50px"}} className={styles.cartbut}>Add To Cart</button>
          </div>
        ))}
      </ul>
    </div>
  );
}