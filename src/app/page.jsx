"use client"
import { Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "@/components/Header/Header";
import Hero from '@/components/Hero/Hero'
import Products from "@/components/Products/Products";
import Footer from "@/components/Footer/Footer";
import "@/styles/page.module.css";
import { supabase } from "@/lib/SubaBaseClient";


function HomePage() {

  const searchParms = useSearchParams()

  const router = useRouter()

  const hasShown = useRef(false)

  useEffect(() => {
    const updateCart = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const cartToSync = cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        }))
        if (cartItems.length > 0) {
          localStorage.removeItem("cart")
          const { error } = await supabase.rpc("sync_and_merge_cart", {
            user_id_param: data.user.id,
            items_to_merge: cartToSync,
          })
          if (error) {
            toast.error("Failed to load your old cart. Please add your products again.", { id: "floadold" })
            console.error(error)
          } else {
            window.dispatchEvent(new Event("cartUpdated"));
          }
        }
      }
    }

    if (hasShown.current === false && searchParms.get("login") === 'success') {
      toast.success("Logged in successfully!")
      hasShown.current = true;
      router.replace('/')
    }
    updateCart()
  }, [searchParms])


  return (
    <div>
      <Header />
      <Hero />
      <Products />
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div></div>}>
      <HomePage />
    </Suspense>
  )
}