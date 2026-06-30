"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from './page.module.css'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { supabase } from "@/lib/SubaBaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { productTypes } from "@/types/types";

export default function Page() {

  const path = usePathname();

  const router = useRouter()

  const [data1, setData1] = useState<productTypes[] | []>([]);

  const [isAdding, setIsAdding] = useState(false)
  const [isDecreasing, setDecreasing] = useState(false)
  const [Quantity, setQuantity] = useState(0)
  const [Clicked, setClicked] = useState<boolean | null>(null)
  const [ChoosedColor, setChoosedColor] = useState('')

  const colors = [
    { id: 1, title: '(black)', url: "/colors/00.png" },
    { id: 2, title: '(white)', url: "/colors/01.jfif" },
    { id: 3, title: '(sky)', url: "/colors/02.png" },
  ]


  const delpro = async () => {
    if (isDecreasing) return;
    setDecreasing(true)
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const exists = cart.find((p: productTypes) => p.id === product.id);

      if (exists && exists.quantity > 1) {
        exists.quantity -= 1;
        setQuantity(exists.quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      else {
        let newCart = cart.filter((item: productTypes) => item.id !== product.id)
        setClicked(false)
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    }
    if (data.user) {
      const { data: existingItem } = await supabase.from("cart").select("*").eq("user_id", data.user.id).eq("product_id", product.id).single()
      if (Quantity > 1) {
        const { } = await supabase.from("cart").update({ quantity: existingItem.quantity - 1 }).eq("user_id", data.user.id).eq("product_id", product.id)
        setQuantity(prev => prev - 1)
      }
      else {
        const { } = await supabase.from("cart").delete().eq("user_id", data.user.id).eq("product_id", product.id).single();
        setClicked(false)
      }
    }
    setDecreasing(false)
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const Check = () => {
    if (product) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const exists = cart.find((p: productTypes) => p.id === product.id);

      if (exists && exists.quantity > 0) {
        setClicked(true)
        setQuantity(exists.quantity)
      }

      if (exists && exists.quantity < 0) {
        setClicked(false)
      }
    }
  }

  const idFromUrl = path.split("/")[2];


  const product = (data1.find((item) => item.id.toString() === idFromUrl) as productTypes)


  const AddToCart = async (item: productTypes, e: React.MouseEvent<HTMLElement>, inner = false) => {
    if (isAdding) return;
    setIsAdding(true)

    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const exists = cart.find((p: productTypes) => p.id === item.id)

      if (exists && exists.quantity === 3) {
        toast.error('You have added maximum count of this product: 3', { id: "local-maximum-quantity" })
        setQuantity(exists.quantity)
        setIsAdding(false)
        return;
      }
      if (exists && exists.quantity + 1 > product.stock) {
        if (product.stock !== 3) {
          toast.error(`Oops! Only ${product.stock} ${product.stock === 1 ? "item" : "items"} left in stock.`, { id: "stock-limit-toast" })
        }
        setIsAdding(false)
        return;
      } else {
        if (exists) {
          exists.quantity += 1
          setQuantity(exists.quantity)
        }
        if (exists && exists.quantity > 0) {
          setClicked(true)
          setQuantity(exists.quantity)
        }
        if (exists) { }
        if (!exists) {
          setClicked(true)
          setQuantity(1)
          cart.push({ ...item, quantity: 1 })
        }
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    }
    if (data.user) {
      const { data: existingItem } = await supabase.from("cart").select("*").eq("user_id", data.user.id).eq("product_id", product.id).single()
      if (existingItem) {
        if (existingItem.quantity + 1 > item.stock) {
          if (item.stock !== 3) {
            toast.error(`Oops! Only ${item.stock} ${item.stock === 1 ? "item" : "items"} left in stock.`, { id: "stock-limit-toast" })
          } else {
            toast.error('You have added maximum count of this product: 3', {
              id: "quantity-limit"
            });
          }
          setIsAdding(false)
          return;
        } else {
          if (existingItem && existingItem.quantity <= 2) {
            const { error } = await supabase.from("cart").update({
              quantity: existingItem.quantity + 1,
            }).eq('id', existingItem.id)
            if (error) {
              toast.error("Failed to add the product to your cart.", { id: "fadd" })
              console.error(error)
            }
            window.dispatchEvent(new Event("cartUpdated"));
            setQuantity(prev => prev + 1)
            flyImage(item, e);
          }
          else {
            if (existingItem && existingItem.quantity >= 3) {
              setIsAdding(false)
              setClicked(true)
              setQuantity(3)
              toast.error('You have added maximum count of this product: 3', {
                id: "quantity-limit"
              });
              setIsAdding(false)
              return;
            }
          }
        }
      }
      else {
        const { error } = await supabase.from("cart").upsert({
          user_id: data.user.id,
          product_id: product.id,
          quantity: 1,
        }, { onConflict: "product_id, user_id" })
        if (error) {
          toast.error("Failed to add the product to your cart.", { id: "fadd" })
          console.error(error)
        }
        setClicked(true)
        setQuantity(1)
      }
    }

    window.dispatchEvent(new Event("cartUpdated"));
    flyImage(item, e);
    setIsAdding(false)
  }

  useEffect(() => {
    const QuantitySetter = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        if (product && product.id) {
          const { data: existingItem } = await supabase.from("cart").select("*").eq("user_id", data.user.id).eq("product_id", product.id).maybeSingle()

          if (existingItem && existingItem.quantity > 0) {
            setClicked(true)
            setQuantity(existingItem.quantity)
          } else {
            setClicked(false)
          }
        }
      } else {
        if (product) {
          let cart = JSON.parse(localStorage.getItem("cart") || "[]")
          const exists = cart.find((p: productTypes) => p.id === product.id)
          if (exists && exists.quantity > 0) {
            setClicked(true)
          } else {
            setClicked(false)
          }
        }
      }
    }
    QuantitySetter()
  }, [product])



  const flyImage = (item: productTypes, e: React.MouseEvent<HTMLElement>) => {

    const card = (e.target as HTMLDivElement).closest('.product-card');
    const productImg = card ? card.querySelector('img') : null;

    if (!productImg) return;


    const ButRect = (e.target as HTMLDivElement).getBoundingClientRect();
    const imgRect = productImg.getBoundingClientRect();
    const flyImg = document.createElement("img");

    flyImg.src = item.image;
    flyImg.style.position = "fixed";
    flyImg.style.left = ButRect.left + "px";
    flyImg.style.top = ButRect.top + "px";


    flyImg.style.width = imgRect.width + "px";
    flyImg.style.height = imgRect.height + "px";

    flyImg.style.transition = "all 0.8s ease-in-out";
    flyImg.style.zIndex = "1000";
    flyImg.style.objectFit = "contain";

    document.body.appendChild(flyImg);

    const cartIcon = document.querySelector(".cartIcon");

    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();

      setTimeout(() => {
        flyImg.style.left = (cartRect.left + (cartRect.width / 2)) + "px";
        flyImg.style.top = (cartRect.top + (cartRect.height / 2)) + "px";
        flyImg.style.width = "0px";
        flyImg.style.height = "0px";
        flyImg.style.opacity = "0";
        flyImg.style.transform = "scale(0) rotate(360deg)";
      }, 10);

      setTimeout(() => flyImg.remove(), 900);
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")

      if (error) {
        toast.error("Failed to load the product details.")
        console.error(error)
      } else {
        setData1(data)
      }
    }
    getData()
  }, [])


  return (
    <div onLoad={Check}>
      <Header router="" />
      <div className={styles.pageWrapper}>
        <img
          onClick={() => { router.back() }}
          className={styles.arrow}
          src={'/help_icons/backarrow.png'}
          alt="HelpIcon"
        />

        {product ? (
          <div className="product-card">
            <div className={styles.productinfo}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.infoproduct}
                />
              )}

              <div className={`${styles.detail} ${styles.detailGrid}`}>
                <h1 className={`${styles.TitleT} ${styles.titlePadding}`}>
                  {`${product.title} ${ChoosedColor}`}
                </h1>

                <div className={styles.prices}>
                  <div className={styles.priceRow}>
                    <h2 className={styles.price}>{product.price}</h2>
                    <h3 className={styles.currency}>SAR</h3>
                  </div>

                  {product.oldPrice !== null ? (
                    <div className={styles.wasRow}>
                      was:&nbsp;
                      <h5 className={styles.oldPrice}>{product.oldPrice}</h5>
                      <h4 className={styles.oldCurrency}>SAR</h4>
                    </div>
                  ) : null}

                  <p className={styles.description}>
                    {product.description}
                  </p>

                  <div className={styles.colorsWrapper}>
                    <div className={styles.colorsInner}>
                      {colors.map((img) => (
                        <button
                          key={img.id}
                          style={{
                            boxShadow: ChoosedColor === img.title ? "rgba(0, 0, 0, 0.2)" : "none",
                            border: ChoosedColor === img.title
                              ? "2px solid rgb(26, 117, 232)"
                              : "2px solid rgb(221, 221, 221)",
                            transform: ChoosedColor === img.title
                              ? "scale(1.07)"
                              : "scale(1)"
                          }}
                          className={styles.colorButton}
                          onClick={() => setChoosedColor(img.title)}
                        >
                          <img
                            src={img.url}
                            className={styles.colorImage}
                            alt={img.title}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <span
                    className={`${styles.StockText} ${styles.productStock}`}
                    style={{
                      width: product.stock <= 5 && product.stock !== 0 ? "245px" : "130px",
                      color:
                        product.stock <= 5 && product.stock !== 0
                          ? "#d97706"
                          : product.stock !== 0
                            ? "#16a34a"
                            : "#94a3b8"
                    }}
                  >
                    {product.stock <= 5 && product.stock !== 0
                      ? `only ${product.stock} ${product.stock > 1 ? `products left in stock ( ! )` : `product left in stock ( ! )`}`
                      : product.stock !== 0
                        ? "In Stock ✓"
                        : "Sold Out ✕"}
                  </span>

                  {Clicked === false &&
                    <div className={styles.cartSection}>
                      <div className={styles.cartGrid}>
                        {product.stock === 0
                          ? <button
                            className={styles.outStock}
                            style={{
                              pointerEvents: "none"
                            }}
                          >
                            Out of Stock
                          </button>
                          : <button
                            disabled={isAdding}
                            onClick={(e) => AddToCart(product, e)}
                            className={`${styles.cartbut1} ${styles.addCartButton}`}
                            style={{
                              pointerEvents: (isAdding) ? "none" : "auto"
                            }}
                          >
                            <span>{isAdding ? "Adding ..." : "Add To Cart"}</span>
                          </button>}
                      </div>
                    </div>}

                  {Clicked === true &&
                    <div className={`${styles.cartbut1} ${styles.quantityWrapper}`}>
                      <button
                        disabled={isDecreasing || isAdding}
                        className={styles.quantityButtonLeft}
                        style={{
                          color: isAdding || isDecreasing ? "#94a3b8" : "#fff",
                          opacity: isAdding || isDecreasing ? "0.6" : "1",
                          cursor: isAdding || isDecreasing ? "not-allowed" : "pointer",
                          pointerEvents: (isAdding || isDecreasing) ? "none" : "auto",
                        }}
                        onClick={delpro}
                      >
                        {Quantity === 1
                          ? <svg className={styles.deleteSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path
                              style={{ opacity: isAdding || isDecreasing ? "0.6" : "1" }}
                              fill={isAdding === true || isDecreasing === true ? "#94a3b8" : "#ffffff"}
                              d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"
                            />
                          </svg>
                          : <span>-</span>}
                      </button>

                      {isAdding || isDecreasing
                        ? <svg
                          className={`${styles.animateSpin} ${styles.quantityLoaderWhite}`}
                          viewBox="0 0 50 50"
                        >
                          <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4"></circle>
                        </svg>
                        : <div className={styles.quantityValue}>
                          {Quantity}
                        </div>}

                      <button
                        disabled={isDecreasing || isAdding}
                        className={styles.quantityButtonRight}
                        style={{
                          color: isAdding || isDecreasing ? "#94a3b8" : "#fff",
                          opacity: isAdding || isDecreasing ? "0.6" : "1",
                          cursor: isAdding || isDecreasing ? "not-allowed" : "pointer",
                          pointerEvents: (isAdding || isDecreasing) ? "none" : "auto",
                        }}
                        onClick={(e) => AddToCart(product, e, true)}
                      >
                        +
                      </button>
                    </div>}

                  {Clicked === null &&
                    <div className={`${styles.cartbut1} ${styles.quantityWrapper}`}>
                      <svg
                        className={`${styles.animateSpin} ${styles.quantityLoaderBlack}`}
                        viewBox="0 0 50 50"
                      >
                        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4"></circle>
                      </svg>
                    </div>}

                  <span className={styles.deliveryText}>
                    get it
                    <span className={styles.deliveryTime}>
                      {product.time === 1 && "tomorrow" || product.time % 7 !== 0 && `after ${product.time} days` || product.time % 7 === 0 && `after ${product.time / 7} ${product.time / 7 === 1 ? `week` : `weeks`}`}
                    </span>
                  </span>

                  <ul className={styles.featuresList}>
                    <h3>Product Features:</h3>

                    {product.features.split("\n").map((f, i) => (
                      <li key={i} className={styles.featureItem}>
                        {f}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </div>
        )
          :
          (
            <p className={styles.para}>Loading the product or the product is not defined...</p>
          )
        }
      </div>
      <Footer />
    </div >
  );
}