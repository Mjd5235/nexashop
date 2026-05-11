"use client"
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/SubaBaseClient'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Header from '@/app/Admin/components/Header/Header'
import Sidebar from '@/app/Admin/components/Sidebar/Sidebar'
import Image from 'next/image'
import styles from '../../Products.module.css'
import Link from 'next/link'

export default function Edit() {

    const [data1, setData1] = useState([])
    const path = usePathname()
    const router = useRouter()

    const [file, setFile] = useState(null)
    const [name, setName] = useState(null)

    const [description, setDescription] = useState(null)
    const [features, setFeatures] = useState(null)
    const [stock, setStock] = useState(null)
    const [time, setTime] = useState(null)
    const [price, setPrice] = useState(null)
    const [oldPrice, setOldPrice] = useState(null)

    const [preview, setPreview] = useState(null)
    const [category, setCategory] = useState(null)

    const idFromUrl = path.split("/")[4]
    const find = data1.find(prod => prod.id.toString() === idFromUrl)

    const [sided, setSided] = useState(true)

    const SideB = () => {
        { sided === true ? setSided(false) : setSided(true) }
    }

    const categories = [
        { id: 1, name: "Phones", },
        { id: 2, name: "Tablets", },
        { id: 3, name: "Computers", },
        { id: 4, name: "Displays", },
        { id: 5, name: "Headphones and smart wathces", },
    ]

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")

            if (error) {
                console.log(error.message)
            } else {
                setData1(data)
            }
        }
        getData()
    }, [])

    const handleFile = (file) => {

        const selectedFile = file
        const onlyImages = selectedFile && selectedFile.type.startsWith("image/")

        if (selectedFile && onlyImages) {
            setFile(selectedFile)
            setPreview(URL.createObjectURL(file))
        }
        if (!onlyImages && selectedFile) {
            alert("Only images allowed")
        }
    }

    const FormsReset = () => { setFile(null); setPreview(null); setName(null); setCategory(null); setDescription(null); setFeatures(null); setStock(null); setTime(null); setPrice(null); setOldPrice(null); }


    const handleSave = async () => {

        let image = find.image
        let filePath = find.image_path

        if (file) {
            const fileName = file.name
            filePath = `${find.category}/${fileName}`

            const { error: removeError } = await supabase
                .storage
                .from("products images")
                .remove([find.image_path])
            if (removeError) {
                alert(removeError.message)
            }

            const { error: uploadError } = supabase
                .storage
                .from("products images")
                .upload(filePath, file)
            if (uploadError) {
                alert(uploadError.message)
            }

            const { data } = supabase
                .storage
                .from("products images")
                .getPublicUrl(filePath)
            image = data.publicUrl
        }

        if (name !== "" && description !== "" && features !== "") {
            const { error } = await supabase
                .from("products")
                .update({
                    image: image,
                    title: name ?? find.title,
                    category: category ?? find.category,
                    description: description ?? find.description,
                    features: features ?? find.features,
                    stock: stock ?? find.stock,
                    time: time ?? find.time,
                    price: price ?? find.price,
                    oldPrice: oldPrice === "" ? null : oldPrice ?? find.oldPrice,
                    image_path: filePath,
                })
                .eq("id", idFromUrl)

            if (error) {
                alert(error.message)
            } else {
                alert("Updated successfully")
                router.push("/Admin/Products")
            }
        } else {
            alert("All fields must be completed.")
        }
    }


    return (
        <div>
            <div style={{ display: "flex", }}>
                {sided ?
                    <div style={{ width: "250px", }}>
                        <Sidebar height="1200px" font="Products" />
                    </div>
                    : null}
                <Image style={{ display: 'grid', marginTop: "20px", position: "absolute", marginLeft: sided ? "300px" : "100px", cursor: "pointer", }} src={'/Admin/Icons/menu.svg'} width={35} height={35} alt='menu' onClick={SideB} />
                <div style={{ display: "grid" }}>
                    <div style={{ width: sided ? "1655px" : "1920px", marginLeft: sided ? "250px" : "0", marginLeft: sided ? "0px" : "", }}>
                        <Header />
                        {find ?
                            <div key={find.id} style={{ display: "grid", marginLeft: "150px", }}>
                                <div style={{ display: "flex", marginTop: "30px", justifyContent: "space-between" }}>
                                    <div style={{ fontWeight: "bold", background: "linear-gradient(to right, #1a75e8, #92d0ff)", fontWeight: "700", fontSize: "32px", letterSpacing: "0.5px", color: "transparent", whiteSpace: 'nowrap', backgroundClip: "text", width: "350px", marginLeft: "30px" }}>Edit product details</div>
                                </div>
                                <div style={{ marginTop: "50px", marginLeft: "30px", boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)", width: "1050px", padding: "45px", borderRadius: "12px", height: "865px" }}>
                                    <div style={{ display: "flex" }}>

                                        <div style={{ display: "grid", marginLeft: "-60px", }} ><span style={{ color: "#4a4a4a", marginLeft: "84px", }}>Product Image</span><div style={{ position: "relative", width: "270px", height: "170px" }}><Image style={{ objectFit: "contain" }} src={preview !== null && preview !== "" ? preview : find.image} fill alt={find.title} /></div></div>
                                        <label
                                            onDrop={(e) => {
                                                e.preventDefault()
                                                handleFile(e.dataTransfer.files[0])
                                            }}

                                            onDragOver={(e) => {
                                                e.preventDefault()
                                            }}
                                            style={{ border: file !== null ? "2px dashed #1a75e8" : "1px dashed #9a9a9a", width: "750px", height: "215px", marginLeft: "0px", justifyContent: "center", alignContent: 'center', alignItems: "center", display: "grid", justifyItems: "center", color: "#4a4a4a", }}>

                                            <input onChange={(e) => { handleFile(e.target.files[0]) }} type='file' accept='image/*' hidden />
                                            <Image src={'/Admin/Icons/uploadn.svg'} width={30} height={30} alt='upload' />

                                            <span style={{ display: "grid", color: "#4a4a4a", marginTop: "10px" }}>Click or drag image to upload<span style={{ marginTop: "7px", marginLeft: "6px", marginBottom: "7px" }}>PNG, JPG, SVG up to 5MP</span></span>
                                            {file !== null && <span>{file.name}<span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFile(null); setPreview(null) }} style={{ cursor: " pointer", }}> <svg style={{ marginBottom: "-7px" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4a4a4a"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" /></svg></span></span>}

                                        </label>
                                    </div>

                                    <div style={{ display: "flex", marginTop: "50px", }}>
                                        <div style={{ display: "grid", marginRight: "50px", flex: "1", }}><span style={{ color: "#4a4a4a" }}>Product name</span><input value={name !== null ? name : find.title} onChange={(e) => { setName(e.target.value) }} style={{ padding: "8px", marginTop: "6px", }} type="text" /></div>
                                        <div style={{ display: "grid", flex: "1", }}><span style={{ color: "#4a4a4a", }}>Product Category</span><select style={{ padding: "5px" }} value={category ?? find.category} onChange={(e) => { setCategory(e.target.value); }}>{categories.map(cat => (<option key={cat.id}>{cat.name}</option>))}</select></div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "grid", marginTop: "50px" }}><span style={{ color: "#4a4a4a" }}>Description</span><textarea value={description !== null ? description : find.description} onChange={(e) => { setDescription(e.target.value) }} type="text" style={{ width: "455px", marginRight: "50px", height: "75px", padding: "6px", whiteSpace: "pre-wrap", marginTop: "6px" }} /></div>
                                        <div style={{ display: "grid", marginTop: "50px" }}><span style={{ color: "#4a4a4a" }}>Features</span><textarea value={features !== null ? features : find.features} onChange={(e) => { setFeatures(e.target.value) }} type="text" style={{ width: "455px", height: "75px", padding: "6px", whiteSpace: "pre-wrap", marginTop: "6px" }} /></div>
                                    </div>

                                    <div style={{ display: "flex", marginTop: "50px" }}>
                                        <div style={{ display: "grid", flex: "1", marginRight: "50px" }}><span style={{ color: "#4a4a4a" }}>Stock quantity</span><input value={stock !== null ? stock : find.stock} onChange={(e) => { setStock(e.target.value >= 0 ? e.target.value : alert("Stock cannot be negative") & "0") }} style={{ padding: "8px", marginTop: "6px", width: "450px" }} type="number" /></div>
                                        <div style={{ display: "grid", flex: "1", marginRight: "50px" }}><span style={{ color: "#4a4a4a" }}>Delivery time</span><div style={{ display: "flex" }}><input value={time !== null ? time : find.time} onChange={(e) => { setTime(e.target.value >= 0 && e.target.value <= 28 ? e.target.value : alert("Days cannot be negative or more than 4 weeks") & "0") }} style={{ padding: "8px", marginTop: "6px", width: "450px" }} type="number" /><span style={{ fontSize: "14px", marginTop: "15px", marginLeft: "3px" }}>Days</span></div></div>
                                    </div>

                                    <div style={{ display: "flex", marginTop: "50px" }}>
                                        <div style={{ display: "grid", width: "500px", color: "#4a4a4a" }}><span style={{ color: "#4a4a4a" }}>Price</span><div style={{ display: "flex", }}><input value={price !== null ? price : find.price} onChange={(e) => { setPrice(e.target.value >= 0 ? e.target.value : alert("Price cannot be negative") & "0") }} style={{ padding: "8px", marginTop: "6px", width: "450px", }} type="number" /><span style={{ fontSize: "14px", marginTop: "15px", marginLeft: "3px", }}>SAR</span></div></div>
                                        <div style={{ display: "grid", width: "500px", color: "#4a4a4a", marginLeft: "30px" }}><span style={{ color: "#4a4a4a" }}>Old price</span><div style={{ display: "flex", }}><input value={oldPrice !== null ? oldPrice : find.oldPrice} onChange={(e) => { setOldPrice(e.target.value >= 0 ? e.target.value : alert("Old price cannot be negative") & "00") }} style={{ padding: "8px", marginTop: "6px", width: "450px" }} type="number" /> <span style={{ fontSize: "14px", marginTop: "15px", marginLeft: "3px" }}>SAR</span></div></div>
                                    </div>

                                    <div style={{ display: "flex", direction: "rtl", }}>
                                        <div style={{ display: "flex", justifyContent: "right", marginTop: "50px", }}><button className={styles.saveChan} style={{ padding: "8px 16px", alignItems: 'center', color: "white", alignContent: "center", textAlign: "center", border: "none", fontSize: "16px", cursor: "pointer", fontSize: "15px" }} onClick={() => handleSave()}>Save changes</button></div>
                                        <div style={{ display: "flex", justifyContent: "right", marginTop: "50px", marginRight: "10px" }}><Link href='/Admin/Products' className={styles.cancel} style={{ padding: "8px 16px", alignItems: 'center', alignContent: "center", textAlign: "center", border: "none", fontSize: "16px", fontWeight: "normal", cursor: "pointer", fontSize: "15px", }}>Cancel</Link></div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "left", marginTop: "-33px" }}><button className={styles.reset} style={{ padding: "8px 16px", alignItems: 'center', alignContent: "center", textAlign: "center", border: "none", fontSize: "16px", fontWeight: "normal", cursor: "pointer", fontSize: "15px", }} onClick={() => FormsReset()}>Reset to default</button></div>


                                </div>
                            </div>
                            :
                            <p>Loading the product or the product is not defined</p>}
                    </div>
                </div>
            </div >
        </div >
    )
}