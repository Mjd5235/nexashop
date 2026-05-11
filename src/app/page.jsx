"use client"
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "@/components/Header/Header";
import Hero from '@/components/Hero/Hero'
import Products from "@/components/Products/Products";
import Footer from "@/components/Footer/Footer";
import "@/styles/page.module.css";

export default function Home() {

  const searchParms = useSearchParams()

  const router = useRouter()

  const hasShown = useRef(false)

  useEffect(() => {

    if (hasShown.current === false && searchParms.get("login") === 'success') {
      toast.success("Logged in successfully!")
      hasShown.current = true;
      router.replace('/')
    }
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
