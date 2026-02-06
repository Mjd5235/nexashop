"use client";
import React, {  useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from './page.module.css'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

export default function Page() {

  const path = usePathname();

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  const [Quantity, setQuantity] = useState(0)
  const [Clicked, setClicked] = useState(false)
  const [ChoosedColor, setChoosedColor] = useState('')

  const colors = [
    {id: 1,title: '(black)', url: "/colors/00.png"},
    {id: 2,title: '(white)', url: "/colors/01.jfif"},
    {id: 3,title: '(sky)', url: "/colors/02.png"},
  ]

  
  const delpro = (index) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const exists = cart.find(p => p.page === product.page);

  if (exists && exists.quantity > -1) {
    exists.quantity -= 1;
    setQuantity(exists.quantity);
    if(exists && exists.quantity == 0){
      cart.splice(index,1);
    }
    
    if(exists && exists.quantity === 0){
      setClicked(false)
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }
}
  
const Check = () => {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const exists = cart.find(p => p.page === product.page);

  if (exists && exists.quantity > 0) {
    setClicked(true)
    setQuantity(exists.quantity)
    }

    if(exists && exists.quantity < 0){
      setClicked(false)
    }
  }
  
  const idFromUrl = path.split("/")[2];

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then(({ data1, data2, data3, data4, data5, }) => {
        setData1(data1);
        setData2(data2);
        setData3(data3);
        setData4(data4);
        setData5(data5);
      })
      .catch((err) => console.error("خطأ في جلب البيانات:", err));
  }, []);


   const product =
    data1.find((item) => item.page.toString() === idFromUrl) ||
    data2.find((item) => item.page.toString() === idFromUrl) ||
    data3.find((item) => item.page.toString() === idFromUrl) ||
    data4.find((item) => item.page.toString() === idFromUrl) ||
    data5.find((item) => item.page.toString() === idFromUrl);


    
    const AddCart = (item, e, inner = false) => {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]")
 
      const addPro = (inner = true) => {setClicked(true);Quantity !== 3 ? setQuantity(Quantity +1) : null}
      if(inner=== true){
          addPro()
      }
      
      const exists = cart.find(p => p.page === item.page)

      if(exists && exists.quantity === 3){
        alert("You have added maximum count of this product!")
        setQuantity(exists.quantity)
        return ;
      }
              
      if(exists){
        exists.quantity +=1
      }

      if(exists && exists.quantity > 0){
        setClicked(true)
      }
      
      if(exists){setQuantity(exists.quantity)}

      if(!exists){
        cart.push({...item, quantity: 1 })
      }
      
      localStorage.setItem("cart", JSON.stringify(cart))

      window.dispatchEvent(new Event("cartUpdated"));


      flyImage(item, e);
    }
  


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
    <div onLoad={Check}>
      <Header />
      <div style={{ marginBottom: "100px",}}><Link href="/"><img className={styles.arrow} src={'/help_icons/backarrow.png'} alt="HelpIcon"/></Link>
        {product ? ( 
          <div className={styles.productinfo}>
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className={styles.infoproduct}
              />
            )}

            <div className={styles.detail} style={{display: "grid",}}>
              <h1 className={styles.TitleT} style={{padding: "16px", display: "flex",}}><div style={{color: "#1a75e8"}}>Buy&nbsp;</div> {`${product.title} ${ChoosedColor}`}</h1>
                  <div className={styles.prices}>
                    <div style={{display: "flex", marginTop: "5px", marginBottom: "3px"}}><h2 className={styles.price}>{product.price}</h2><h3 style={{marginTop: "6px", marginLeft: "2px", fontSize: "12px"}}>SAR</h3></div>
                      {product.sale === true ? <div style={{display: "flex", fontWeight: "bold",marginTop: "7px", marginBottom: "15px"}}>was:&nbsp;<h5 style={{textDecoration: "line-through",  }}>{product.was}</h5><h4 style={{marginTop: "6px", marginLeft: "2px", fontSize: "9px"}}>SAR</h4></div> : null}

                      <p style={{fontSize: "16px",}}>{product.description}</p>
                      <div style={{display: "flex", marginTop: "16px"}}>
                        <div style={{display: "flex",}}>
                          {colors.map((img)=><button key= {img.id} style={{backgroundColor: "white", boxShadow: ChoosedColor === img.title ? "rgba(0, 0, 0, 0.2) " : 'none', border: ChoosedColor === img.title ? "2px solid rgb(26, 117, 232)" : "2px solid rgb(221, 221, 221)", transform: ChoosedColor === img.title ? "scale(1.07)" : 'scale(1)', transition: "0.3s", borderRadius: "8px", width: "35px", height: "35px", marginRight: "7px", objectFit: "cover"}} onClick={()=>setChoosedColor(img.title)}><img src={img.url} style={{width: "31px", height: "31px", padding: "3px", cursor: "pointer"}} alt={img.title} /></button>)}
                        </div> 
                      </div>

                      {Clicked  === true ?
                      <div className={styles.cartbut1} style={{display: "flex", width: "130px", borderRadius: "8px", height: "49.2px", marginTop: "45px"}}>
                        <button className={styles.cartbut} style={{width: "43.33px", padding: "5px", fontSize: "10px", backgroundColor: "#1a75e8", color: "#fff", border: "#1a75e8" , borderRadius: "13px 0 0 13px", fontSize: "23px", cursor: "pointer",}} onClick={delpro}>{Quantity === 1 ? <svg style={{marginTop: "6px", marginRight: "4px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#ffffff" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg> : <span>-</span>}</button>
                          <div className={styles.cartbut} style={{fontSize: "23px", backgroundColor: "#1a75e8", width: "43.33px", height: "27px", color: "#fff", padding: "0px 0px 0px 9px",}}>{Quantity}</div>
                            <button className={styles.cartbut} style={{width: "43.33px", padding: "5px", fontSize: "10px", backgroundColor: "#1a75e8",color: "#fff", border: "#1a75e8", borderRadius: "0 13px 13px 0", fontSize: "23px", cursor: "pointer",}} onClick={(e)=>AddCart(product,e ,true)}>+</button>
                      </div>
                      : 
                      <div style={{display: "flex", marginTop: "0px",}}>
                        <div style={{display: "grid"}}>
                          <button onClick={(e)=> AddCart(product, e, true)} className={styles.cartbut1} style={{width: "130px", display: "flex", cursor: "pointer", border: "none", marginTop: "45px"}}>
                            <span>Add To Cart</span></button>
                      </div> </div>
                      }
                      <span style={{textAlign: "left", right: 0, fontSize: "14px", float: "left", display: "flex", marginTop: "20px"}}>get it<span style={{fontWeight: "bold", paddingLeft: "3px"}}>{product.date}</span></span>

            <ul style={{marginTop: "60px", display: 'grid', marginLeft: "5px"}}><h3>Product Features:</h3>
              <li style={{display: "grid", paddingTop: "25px", marginLeft: "32px"}}>{product.features[0]}</li>
              <li style={{display: "grid", paddingTop: "25px", marginLeft: "32px"}}>{product.features[1]}</li>
              <li style={{display: "grid", paddingTop: "25px", marginLeft: "32px"}}>{product.features[2]}</li>
              <li style={{display: "grid", paddingTop: "25px", marginLeft: "32px"}}>{product.features[3]}</li>
            </ul>
            
          </div>
        </div>
      </div>

      )
      : 
      (
        <p className={styles.para}>Loading the Product or the product is not defined...</p>
      )
      }
      </div>
      <Footer />
    </div>
  );
}