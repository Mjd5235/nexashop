import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Hero from '@/components/Hero/Hero'
import Products from "@/components/Products/Products";
import Footer from "@/components/Footer/Footer";
import CartSyncProvider from "./providers/CartSyncProvider";
import ProductsSkeleton from "@/components/Products/ProductsSkeleton";
import styles from './page.module.css'

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
        <Suspense fallback={<div className={styles.ProductsSkeleton}><ProductsSkeleton /></div>}>
          <Products />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return <HomePage />
}