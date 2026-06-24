"use client"
import { useEffect, useState } from "react";
import styles from './Products.module.css';
import { supabase } from "@/lib/SubaBaseClient";
import AllCategories from './AllCategories';

export default function Products() {

  const categories = [
    { id: 1, category: "Phones", title: "Phones" },
    { id: 2, category: "Tablets", title: "Tablets" },
    { id: 3, category: "Computers", title: "Computers" },
    { id: 4, category: "Displays", title: "Displays" },
    { id: 5, category: "Watches", title: "Smart Watches and Headphones" },
  ]

  const [data1, setData1] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {

      const { data, error } = await supabase
        .from('products')
        .select("*")
        .order('created_at', { ascending: false, })

      if (error) {
        toast.error("Failed to load shop products. Please refresh the page or try again later.", { id: "floadshop" })
        console.error(error)
      } else {
        setData1(data)
      }
      setLoading(false)
    }
    getData()
  }, [])

  return (
    <div id="products" className={styles.proarea}>
      {categories.map(cat => (<AllCategories key={cat.id} category={cat.category} title={cat.title} loading={loading} data1={data1.filter(p => p.category === cat.category)} />))}
    </div>
  );
}