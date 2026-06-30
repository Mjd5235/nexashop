"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from './page.module.css'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Image from 'next/image'
import Link from "next/link";
import { supabase } from "@/lib/SubaBaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Skeletons from "./Skeletons";
import { CartType, OrderType } from "@/types/types";

export default function Page() {

  const [data6, setData6] = useState<CartType[] | [] | null>([]);
  const [logged, setLogged] = useState<boolean>(false)
  const [localCart, setLocalCart] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<Record<number, string>>({});
  const [quan, setQuan] = useState<number>(1)
  const [Loading, setLoading] = useState<boolean>(true)
  const [increasingId, setIncId] = useState<number | null>(null)
  const [decreasingId, setDecId] = useState<number | null>(null)
  const [isRemoving, setIsRemoving] = useState<number | null>(null)
  const hasShown = useRef<boolean>(false)
  const hasChanged = useRef<boolean>(false)


  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        const cartItems: CartType[] = JSON.parse(localStorage.getItem("cart") || "[]")
        const productsId = cartItems.map(item => item.id)

        const { data: Products } = await supabase.from("products").select("*").in("primary_key", productsId)
        const UpdatedCart = (Products as CartType[]).map(item => {
          const MatchedCartItem = cartItems.find(cart => cart.id === item.id)
          return { ...item, quantity: MatchedCartItem ? MatchedCartItem.quantity : 1 }
        })
        setData6(UpdatedCart)
      } else {
        const cartItems: CartType[] = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cartItems.length === 0) {
          const { data: cart, error: bug } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id).order("created_at", { ascending: false })
          if (bug) { console.error(bug); toast.error("Failed to load your cart.", { id: "floading" }) } else {
            if (cart && cart.length > 0) {
              setData6(cart as unknown as CartType[])
            } else {
              const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
              setData6(cartItems)
              window.dispatchEvent(new Event("cartUpdated"));
              setLocalCart(true)
              setLoading(false)
            }
          }
        }
        const { data: cart, } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id).order("created_at", { ascending: false })
        setData6(cart as unknown as CartType[])
        setLocalCart(false)
        setLoading(false)
      }
      if (data6 && data6.length > 0) {
        StockValidation(data6)
      }
      setLoading(false)
      setIsRemoving(null)
    }
    getData()

  }, [quan, data6 && data6.length]);


  const removeFromCart = async (index: number, img: CartType) => {
    setIsRemoving(img.id)
    const { data } = await supabase.auth.getUser()
    if (!data.user || localCart === true) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");

      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));

      setData6([...cart]);
    } else {
      const { } = await supabase.from("cart").delete().eq("user_id", data.user.id).eq("product_id", img.products.primary_key)
      setQuan(prev => prev + 5)
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };


  const removeCart = async () => {
    const { data } = await supabase.auth.getUser()
    if (!data.user || localCart === true) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.splice("cart");
      localStorage.setItem("cart", JSON.stringify(cart));

      setData6([...cart]);
    }
    else {
      const { } = await supabase.from("cart").delete().eq("user_id", data.user.id)
      setData6(null)
      setQuan(prev => prev + 5)
    }
    window.dispatchEvent(new Event("cartUpdated"));
    setLoading(false)
  }

  const increaseQty = async (index: number, img: CartType) => {
    setIncId(img.id)
    const { data } = await supabase.auth.getUser()
    if (!data.user || localCart === true) {
      let cart = data6 as CartType[]
      if (cart[index].quantity < 3 && cart[index].quantity + 1 <= img.stock) {
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        setData6([...cart]);
      } else {
        if (img.quantity !== 3) {
          toast.error(`Oops! Only ${img.stock} ${img.stock === 1 ? "item" : "items"} left in stock.`, { id: "stock-limit-toast" })
        } else {
          toast.error('You have added maximum count of this product: 3', {
            id: "quantity-limit"
          });
        }
        setIncId(null)
        return;
      }
    }
    else {
      const newData = [...data6 as CartType[]]
      if (newData[index].quantity < 3 && newData[index].quantity + 1 <= img.products.stock) {
        const Quantity = newData[index].quantity += 1
        setData6([...newData])

        // I used setTimeOut, clearTimeOut because of race conditions occurring between the interface and the supabase data. //
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(async () => { const { } = await supabase.from("cart").update({ quantity: Quantity }).eq("user_id", data.user.id).eq("product_id", img.products.primary_key); timerRef.current = null }, 50)
      }
      else {
        if (img.quantity !== 3) {
          toast.error(`Oops! Only ${img.products.stock} ${img.products.stock === 1 ? "item" : "items"} left in stock.`, { id: "stock-limit-toast" })
        } else {
          toast.error('You have added maximum count of this product: 3', {
            id: "quantity-limit"
          });
        }
        setIncId(null)
        return;
      }
    }
    window.dispatchEvent(new Event("cartUpdated"));
    setIncId(null)
  };

  const decreaseQty = async (index: number, img: CartType) => {
    setDecId(img.id)
    const { data } = await supabase.auth.getUser()
    if (!data.user || localCart === true) {
      let cart = data6 as CartType[]
      if (cart[index].quantity > 0) {
        cart[index].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        setData6([...cart]);
      }
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        setData6([...cart]);
      }
    }
    else {
      const newData = [...data6 as CartType[]]
      if (newData[index].quantity !== 1) {
        const Quantity = newData[index].quantity -= 1
        setData6([...newData] as CartType[])
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(async () => { const { } = await supabase.from("cart").update({ quantity: Quantity }).eq("user_id", data.user.id).eq("product_id", img.products.primary_key); timerRef.current = null }, 50)
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        const { } = await supabase.from("cart").delete().eq("user_id", data.user.id).eq("product_id", img.products.primary_key);
        setQuan(prev => prev + 5)
      }
    }
    window.dispatchEvent(new Event("cartUpdated"));
    setDecId(null)
  };

  const CheckedOut = async (totat_price: number) => {
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      hasChanged.current = false;
      const { data: cart } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id)
      for (let img of (cart as unknown as CartType[])) {
        if (img.quantity > img.products.stock) {
          if (img.products.stock !== 0) {
            const { } = await supabase.from("cart").update({ quantity: img.products.stock }).eq("user_id", data.user.id).eq("product_id", img.products.primary_key)
            hasChanged.current = true
          } else {
            const { } = await supabase.from("cart").delete().eq("user_id", data.user.id).eq("product_id", img.products.primary_key)
            hasChanged.current = true
          }
        }
      }

      if (hasChanged.current === true) {
        const { data: FinalCart } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id)
        setData6(FinalCart as unknown as CartType[])
        if (hasShown.current === false) {
          toast("We’ve updated your cart items to match the current stock.", { icon: "🛍️", style: { backgroundColor: "#fff", color: "#1a1a1a", borderLeft: "solid 4px #1a75e8", maxWidth: "400px", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", borderRadius: "6px", padding: "14px 20px", fontWeight: "600", fontSize: "14px" }, id: "update-cart-quantity", duration: 5000 });
          hasShown.current = true
        }
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        const { data: CartItems, error: upl } = await supabase.from("cart").select("product_id, quantity, products: product_id (primary_key, title, image, price, category)").eq("user_id", data.user.id)
        if (upl) { console.error(upl); toast.error("Failed to checkout.", { id: "fSecCheck" }) } else {
          const mappedCartItems = (CartItems as unknown as CartType[]).map((item) => ({
            product_id: item.product_id,
            image: item.products.image,
            title: item.products.title,
            price: item.products.price,
            category: item.products.category,
            quantity: item.quantity,
          }))
          const { error } = await supabase.from("orders").upsert({ total_price: finalPrice, status: "Confirmed", user_id: data.user.id, cart_items: mappedCartItems, user_email: data.user.email, user_avatar: data.user.user_metadata.name.charAt(0).toUpperCase() }).single()
          if (error) { console.error(error); toast.error("Failed to checkout.", { id: "fSecCheck" }) } else {
            document.cookie = "allowed_to_success=true; path=/; max-age=10"
            router.push("/checkout/success")
            toast.success("Checked Out Successfully.", { id: "Thank-you" })
          }
        }

        const { data: cartDetails } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id)
        for (let img of (cartDetails as unknown as CartType[])) {
          const newStock = img.products.stock - img.quantity
          const { error } = await supabase.from("products").update({ stock: newStock }).eq("primary_key", img.products.primary_key)
          if (error) { console.error(error); toast.error("Failed to checkout.", { id: "fSecCheck" }) }
        }

        const { } = await supabase.from("cart").delete().eq("user_id", data.user.id)
        setData6(null)
        setLogged(true)
        setLoading(false)
      }
    } else {
      toast.error("Please log in to continue to checkout.")
      router.push("/login")
    }
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const StockValidation = async (cartItems: CartType[]) => {
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      const updatedCart = cartItems.map((item: CartType) => {

        if (item.quantity > item.stock) {
          hasChanged.current = true;
          return { ...item, quantity: item.stock }
        }
        return item
      }).filter((item: CartType) => item.quantity > 0)
      if (hasChanged.current === true) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setData6([...updatedCart]);
        if (hasShown.current === false) {
          toast("We’ve updated your cart items to match the current stock.", { icon: "🛍️", style: { backgroundColor: "#fff", color: "#1a1a1a", borderLeft: "solid 4px #1a75e8", maxWidth: "400px", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", borderRadius: "6px", padding: "14px 20px", fontWeight: "600", fontSize: "14px" }, id: "update-cart-quantity", duration: 5000 });
          hasShown.current = true
        }
      }
    }

    if (data.user) {
      for (let img of cartItems) {
        if (img.quantity > img.products.stock) {
          if (img.products.stock !== 0) {
            const { } = await supabase.from("cart").update({ quantity: img.products.stock }).eq("user_id", data.user.id).eq("product_id", img.products.primary_key)
            hasChanged.current = true
          } else {
            const { } = await supabase.from("cart").delete().eq("user_id", data.user.id).eq("product_id", img.products.primary_key)
            hasChanged.current = true
          }
        }
      }

      if (hasChanged.current === true) {

        const { data: cart } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id).order("created_at", { ascending: false })
        setData6(cart as unknown as CartType[])
        if (hasShown.current === false) {
          toast("We’ve updated your cart items to match the current stock.", { icon: "🛍️", style: { backgroundColor: "#fff", color: "#1a1a1a", borderLeft: "solid 4px #1a75e8", maxWidth: "400px", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", borderRadius: "6px", padding: "14px 20px", fontWeight: "600", fontSize: "14px" }, id: "update-cart-quantity", duration: 5000 });
          hasShown.current = true
        }
        window.dispatchEvent(new Event("cartUpdated"));
      }
    }
  }

  const totalPrice = data6 && data6.reduce((acc, item) => {
    const price = Number(logged === false || localCart === true ? item.price : item.products.price);
    const quantity = Number(item.quantity);

    return acc + price * quantity
  }, 0);

  const finalPrice = Number(totalPrice && totalPrice.toFixed(2))


  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setLogged(true)
      }
    }
    getUser()
  }, [])


  return (
    <div>
      <Header router="" />
      <div onClick={() => { router.back() }} style={{}}><img className={styles.arrow} src={'/help_icons/backarrow.png'} alt="HelpIcon" /></div>

      <h1 className={styles.cartTitle}>
        Cart
      </h1>

      {Array.isArray(data6) && data6.length > 0 ? (
        <ul className={styles.cartList}>
          {data6.map((img, index) => (

            <li
              key={logged === false || localCart === true ? img.primary_key : img.products.primary_key}
              className={`cart-item ${styles.cartItem}`}
            >
              <div className={styles.imageWrapper}>
                <Link href={`/product/${logged === false || localCart === true ? img.primary_key : img.products.primary_key}`}>
                  <div className={styles.imageBox}>
                    <Image
                      src={logged === false || localCart === true ? img.image : img.products.image}
                      alt={logged === false || localCart === true ? img.title : img.products.title}
                      fill
                      className={`cart-image ${styles.cartImage}`}
                    />
                  </div>
                </Link>
              </div>

              <div className={`cart-details ${styles.cartDetails}`}>
                <h2 className={styles.productTitle}>

                  <Link href={`/product/${logged === false || localCart === true ? img.primary_key : img.products.primary_key}`}>
                    {logged === false || localCart === true ? img.title : img.products.title}{" "}
                  </Link>

                  {selectedColor[index] && (
                    <span className={styles.selectedColor}>
                      ({selectedColor[index]})
                    </span>
                  )}
                </h2>

                <p className={styles.deliveryText}>
                  <span className={styles.deliverySpan}>
                    {logged === false || localCart === true ? img.time === 1 ? "Delivery by" : "Arrives in" : img.products.time === 1 ? "Delivery by" : "Arrives in"}
                    <span className={styles.deliveryTime}>
                      {logged === false || localCart === true ? img.time === 1 && "tomorrow" || img.time % 7 !== 0 && ` ${img.time} days` || img.time % 7 === 0 && ` ${img.time / 7} ${img.time / 7 === 1 ? `week` : `weeks`}` : img.products.time === 1 && "tomorrow" || img.products.time % 7 !== 0 && ` ${img.products.time} days` || img.products.time % 7 === 0 && ` ${img.products.time / 7} ${img.products.time / 7 === 1 ? `week` : `weeks`}`}
                    </span>
                  </span>
                </p>

                <span className={styles.StockText} style={{ color: logged === false || localCart === true ? img.stock <= 5 && img.stock !== 0 ? "#d97706" : img.stock !== 0 ? "#16a34a" : "#94a3b8" : img.products.stock <= 5 && img.products.stock !== 0 ? "#d97706" : img.products.stock !== 0 ? "#16a34a" : "#94a3b8" }}>
                  {logged === false || localCart === true ? img.stock <= 5 && img.stock !== 0 ? `only ${img.stock} ${img.stock > 1 ? `products left in stock ( ! )` : `product left in stock ( ! )`}` : img.stock !== 0 ? "In Stock ✓" : "Sold Out ✕" : img.products.stock <= 5 && img.products.stock !== 0 ? `only ${img.products.stock} ${img.products.stock > 1 ? `products left in stock ( ! )` : `product left in stock ( ! )`}` : img.products.stock !== 0 ? "In Stock ✓" : "Sold Out ✕"}
                </span>

                <div className={styles.colorSection}>
                  <p className={styles.chooseColor}>
                    Choose Color:
                  </p>

                  <div className={styles.colorList}>
                    {[
                      { id: "black", src: "/colors/00.png" },
                      { id: "white", src: "/colors/01.jfif" },
                      { id: "sky", src: "/colors/02.png" },
                    ].map((color) => (
                      <img
                        key={color.id}
                        src={color.src}
                        alt={color.id}
                        onClick={() =>
                          setSelectedColor({
                            ...selectedColor,
                            [index]: color.id,
                          })
                        }
                        className={styles.colorOption}
                        style={{
                          transform:
                            (selectedColor)[index] === color.id ? "scale(1.07)" : "scale(1)",
                          border:
                            (selectedColor)[index] === color.id
                              ? "2px solid #1a75e8"
                              : "2px solid #ddd",
                          boxShadow:
                            (selectedColor)[index] === color.id
                              ? "0px 0px 6px rgba(0,0,0,0.2)"
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.warrantyBox}>
                  <p className={styles.warrantyText}>
                    <b>Warranty:</b> 12 months warranty included
                  </p>
                </div>

                <div className={styles.quantityBox}>
                  <button
                    disabled={increasingId === img.id || decreasingId === img.id}
                    onClick={() => decreaseQty(index, img)}
                    className={styles.quantityButton}
                    style={{
                      pointerEvents: (increasingId === img.id || decreasingId === img.id) ? "none" : "auto",
                    }}
                  >
                    -
                  </button>
                  {increasingId === img.id || decreasingId === img.id
                    ?
                    <svg
                      className={`${styles.animateSpin} ${styles.quantityLoading}`}
                      viewBox="0 0 50 50"
                    >
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="31.4 31.4"
                      ></circle>
                    </svg>
                    :
                    <div className={styles.quantityValue}>
                      {img.quantity}
                    </div>}

                  <button
                    disabled={increasingId === img.id || decreasingId === img.id}
                    onClick={() => increaseQty(index, img)}
                    className={styles.quantityButtonRight}
                    style={{
                      marginLeft: increasingId === img.id || decreasingId === img.id ? "3px" : "",
                      pointerEvents: (increasingId === img.id || decreasingId === img.id) ? "none" : "auto"
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={`cart - prices ${styles.cartPrices}`}>
                <p className={styles.productPrice}>
                  Product: <b className={styles.priceBold}>{Number(logged === false || localCart === true ? img.price : img.products.price).toFixed(2)} SAR</b>
                </p>

                <p className={`ship - price ${styles.shipPrice}`}>
                  <b>Free Shipping</b>
                </p>

                <h3 className={styles.totalPrice}>
                  Total: {Number(logged === false || localCart === true ? img.price * img.quantity : img.products.price * img.quantity).toFixed(2)} SAR
                </h3>

                <div className={styles.del}>
                  <button
                    className={`deletePro ${styles.deleteButton}`}
                    onClick={() => removeFromCart(index, img)}
                  >
                    {isRemoving === img.id
                      ? <svg
                        className={`${styles.animateSpin} ${styles.deleteLoading}`}
                        viewBox="0 0 50 50"
                      >
                        <circle
                          cx="25"
                          cy="25"
                          r="20"
                          fill="none"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray="31.4 31.4"
                        ></circle>
                      </svg>
                      : <img src="https://cdn-icons-png.flaticon.com/512/484/484662.png" alt="Bin" width="16" height="17" />}
                  </button>
                </div>
              </div>
            </li>

          ))
          }
        </ul >
      ) : (
        Loading === true ?
          <div>
            <Skeletons />
          </div>
          :
          <div className={styles.emptyCart}>
            <p className={styles.emptyCartText}>
              Your cart is empty… add some items!
            </p>
          </div>

      )

      }

      {
        data6 && data6.length > 0 && (
          <div className={styles.cartActions}>

            <div className={styles.totalBox}>
              Total: {data6.length > 0 && finalPrice} SAR
            </div>

            <button
              onClick={() => CheckedOut(finalPrice)}
              className={styles.cartbut}
            >
              Checkout
            </button>

            <button
              onClick={() => removeCart()}
              className={styles.deleteAllButton}
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
        )
      }
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div >
  );
}