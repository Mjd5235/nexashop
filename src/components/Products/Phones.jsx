"use client";
import Image from "next/image";
import styles from './Products.module.css';
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function Phones() {
  
  const itemRefs = useRef([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [counter, setCounter] = useState(6);
  const [counter2, setCounter2] = useState(5);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(({ data1, data2 }) => {
        setData1(data1);
        setData2(data2);
      });
  }, []);

  const firstRef = () => {
    if (itemRefs.current[counter]) {
      itemRefs.current[counter].scrollIntoView({
        block: "center",
        behavior: "smooth",
        inline: counter === 6 ? "center" : "end"
      });
      setCounter(prev=>prev+1);
      setCounter2(prev=>prev+1);
    }
  }

  const lastRef = () => {
    if (itemRefs.current[counter2]) {
      itemRefs.current[counter2].scrollIntoView({
        block: "center",
        behavior: "smooth",
        inline: counter2 === 2 ? "start" : "center"
      });
      setCounter(prev=>prev-1);
      setCounter2(prev=>prev-1);
    }
  }

  const hideArrow = () => setCounter2(0);

  
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
    <div style={{ position: "relative", margin: "0 auto", display: "grid",}} onLoad={hideArrow}>
      {counter2 >=1 && counter >=5 && (
        <svg className={styles.arrow1} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" style={{  width: "75px", height: "75px", position: "absolute", zIndex: 10, backgroundColor: "#1a1a1a", fill: "white", borderRadius: "50px", cursor: "pointer", transform: "rotate(180deg)", direction: "ltr",}} onClick={lastRef}> <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path> </svg>
      )}
      {counter !== 7 && counter2 !==2 && (
        <svg className={styles.arrow2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" style={{ width: "75px",height: "75px",position: "absolute", zIndex: 10, marginTop: "190px",backgroundColor: "#1a1a1a",fill: "white",borderRadius: "50px",cursor: "pointer",}} onClick={firstRef}> <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path> </svg>
      )}

      <h2 style={{marginTop: "50px", textAlign: 'center', justifyContent: 'center', alignItems: "center", display: "flex", marginBottom: "50px"}}>Phones</h2>
      <ul className={styles.products} style={{ alignItems: "center", overflowX: "scroll", display: "flex", gap: "10px", margin: "0 auto" }}>
        {data1.map((img) => (
          <div key={img.page} className={styles.product} ref={el => itemRefs.current[img.id] = el}>
            <Link href={`/product/${img.page}`}>
              <li>
                {img.sale && <div style={{backgroundColor: "#1a75e8", color: "#fff", padding: "3px", position: "absolute", borderRadius: "4px", right: "-13px", top: "-8px"}}>sale</div>}
                <Image style={{marginBottom: img.margin}} src={img.image} alt={img.title} width={img.width} height={img.height}/>
                <h3 className={styles.protitle}>{img.title}</h3>
                <p style={{marginBottom: img.margin ? "-49px" : ""}} className={styles.prodes}>{img.description}</p>
                <div style={{display: "grid",height: "51px",marginTop: img.sale === true ? "0px" : "21px", marginTop: img.page === 2 ? "89px" : img.page === 5? "40px" : "21px"}}>
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