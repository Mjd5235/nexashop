import Header from "@/components/Header/Header";
import Hero from '@/components/Hero/Hero'
import Products from "@/components/Products/Products";
import "@/styles/page.module.css";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Products />
      <Footer />
    </div>
  );
}
