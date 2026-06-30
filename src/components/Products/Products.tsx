"use client"
import { useEffect, useState } from "react";
import styles from './Products.module.css';
import { supabase } from "@/lib/SubaBaseClient";
import AllCategories from './AllCategories';
import toast from "react-hot-toast";
import { productTypes } from '@/types/types'

interface categoryTypes {
  id: number,
  title: string,
  category: string,
}

export default function Products() {

  const categories: categoryTypes[] = [
    { id: 1, category: "Phones", title: "Phones" },
    { id: 2, category: "Tablets", title: "Tablets" },
    { id: 3, category: "Computers", title: "Computers" },
    { id: 4, category: "Displays", title: "Displays" },
    { id: 5, category: "Watches", title: "Smart Watches and Headphones" },
  ]

  const [data1, setData1] = useState<productTypes[]>([])
  const [loading, setLoading] = useState<boolean>(true)

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
        const newData: productTypes[] = data
        setData1(newData)
      }
      setLoading(false)
    }
    getData()
  }, [])

  return (
    <div id="products" className={styles.proarea}>
      {(categories).map((cat: categoryTypes) => (<AllCategories key={cat.id} category={cat.category} title={cat.title} loading={loading} data1={(data1 as productTypes[]).filter((p: productTypes) => p.category === cat.category)} />))}
    </div>
  );
}