import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Hero from '@/components/Hero/Hero'
import Products from "@/components/Products/Products";
import Footer from "@/components/Footer/Footer";
import CartSyncProvider from "./providers/CartSyncProvider";

export const revalidate = 60;

function HomePage() {

  return (
    <div>
      <Suspense fallback={null}>
        <CartSyncProvider />
      </Suspense>

      <Header router="" />
      <main>
        <Hero />
        <Products />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return <HomePage />
}