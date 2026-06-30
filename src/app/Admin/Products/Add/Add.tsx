"use client"
import React, { useState, useEffect, use, ChangeEvent, useRef } from 'react'
import { supabase } from '@/lib/SubaBaseClient'
import { useRouter } from 'next/navigation'
import Header from '@/app/Admin/components/Header/Header'
import Sidebar from '@/app/Admin/components/Sidebar/Sidebar'
import Image from 'next/image'
import styles from './Add.module.css'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { productTypes } from '@/types/types'

export default function Add() {

    const [data1, setData1] = useState<productTypes[]>([])
    const router = useRouter()

    const [file, setFile] = useState<File | null>(null)
    const [name, setName] = useState<string | null>(null)

    const [description, setDescription] = useState<string | null>(null)
    const [features, setFeatures] = useState<string | null>(null)
    const [stock, setStock] = useState<number | null | string>(null)
    const [time, setTime] = useState<number | null | string>(null)
    const [price, setPrice] = useState<number | null | string>(null)
    const [oldPrice, setOldPrice] = useState<number | null | string>(null)

    const [preview, setPreview] = useState<string | null>(null)
    const [category, setCategory] = useState<string | null>("Phones")

    const [sided, setSided] = useState<boolean>(true)

    const [nameLength, setNameLength] = useState<number>()
    const [DescriptionLength, setDescriptionLength] = useState<number>()
    const [FeaturesLength, setFeaturesLength] = useState<number>()

    const categories = [
        { id: 1, name: "Phones", },
        { id: 2, name: "Tablets", },
        { id: 3, name: "Computers", },
        { id: 4, name: "Displays", },
        { id: 5, name: "Headphones and smart wathces", },
    ]

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    const fileRef = useRef<HTMLInputElement | null>(null)

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen)
        setSided(!sided)
    }

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")

            if (error) {
                toast.error("Failed to load the product.", { id: "fload" })
                console.error(error)
            } else {
                setData1(data)
            }
        }
        getData()
    }, [])

    const handleFile = (file: File | undefined) => {

        const selectedFile = file
        const onlyImages = selectedFile ? (selectedFile).type.startsWith("image/") : null

        if (selectedFile && onlyImages) {
            setFile(selectedFile)
            setPreview(URL.createObjectURL(file))
            console.log(file)
        }
        if (!onlyImages && selectedFile) {
            toast.error("Only images allowed", { id: "only-img" })
        }
    }

    const FormsReset = () => { setFile(null); setPreview(null); setName(""); setCategory(""); setDescription(""); setFeatures(""); setStock(""); setTime(""); setPrice(""); setOldPrice(""); }


    const handleSave = async () => {

        if (file === null || name === "" || description === "" || features === "" || file === null || name === null || description === null || features === null || price === null || stock === null || time === null || price === "" || stock === "" || time === "") {
            toast.error("All fields must be completed.", { id: "blank-field" })
            return;
        }

        let image = ""
        let filePath = ""

        if (file) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileName = `${uniqueSuffix} - ${((file).name)}`
            filePath = `${category}/${fileName}`

            const { error: uploadError } = await supabase
                .storage
                .from("products images")
                .upload(filePath, file)
            if (uploadError) {
                toast.error("Failed to update.", { id: "fsave" })
                console.error(uploadError)
            }

            const { data } = supabase
                .storage
                .from("products images")
                .getPublicUrl(filePath)
            image = data.publicUrl
        }

        const { data } = await supabase
            .from("products")
            .select("id")
            .order("id", { ascending: false })
            .limit(1)
        const lastID = data?.[0]?.id + 1


        if (image !== "" && name !== "" && description !== "" && features !== "" && image !== null && name !== null && description !== null && features !== null && price !== null && stock !== null && time !== null && price !== "" && stock !== "" && time !== "") {
            const { error, } = await supabase
                .from("products")
                .insert({
                    primary_key: lastID,
                    id: lastID,
                    image: image,
                    title: name,
                    category: category,
                    description: description,
                    features: features,
                    stock: stock,
                    time: time,
                    price: price,
                    oldPrice: oldPrice === "" ? null : oldPrice,
                    image_path: filePath,
                })

            if (error) {
                toast.error("Failed to update.", { id: "fsave" })
                console.error(error)
            } else {
                toast.success("Product added successfully!!", { id: "updated-success" })
                router.push("/Admin/Products")
            }
        } else {
            toast.error("All fields must be completed.", { id: "blank-field" })
        }
    }

    useEffect(() => {
        const getData = async () => {

        }
        getData()
    })
    return (
        <div className={styles.OrdersBg}>
            <div className={styles.dashboardGrid}>
                <div className={styles.sidebarWrapper}>
                    <Sidebar height="100%" font="Products" />
                </div>

                <div className={`${styles.sidebarMobileDrawer} ${isMobileSidebarOpen ? styles.open : ''}`}>
                    <Sidebar height="100%" font="Products" />
                </div>

                <div className={`${styles.sidebarOverlay} ${isMobileSidebarOpen ? styles.active : ''}`} onClick={() => { toggleMobileSidebar() }}></div>

                <div className={styles.mainFlexContainer}>
                    <Image
                        className={styles.menuIcon}
                        src={'/Admin/Icons/menu.svg'}
                        width={35}
                        height={35}
                        alt='menu'
                        onClick={() => { toggleMobileSidebar() }}
                    />

                    <div className={styles.contentContainer}>
                        <Header />
                        <div className={styles.mainContent}>
                            <div className={styles.pageHeader}>
                                <div className={styles.pageTitle}>Add new Product</div>
                            </div>

                            <div className={styles.formContainerWrapper}>
                                <div className={styles.imageUploadSection}>
                                    <div className={styles.imagePreviewContainer}>
                                        <span className={styles.fieldLabelSpecial}>Product Image</span>
                                        <div className={styles.previewBox}>
                                            {preview !== null && preview !== "" && (
                                                <Image className={styles.imageContain} src={preview} fill alt={'new Image'} />
                                            )}
                                        </div>
                                    </div>

                                    <label
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            handleFile(e.dataTransfer.files[0]);
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                        }}
                                        className={`${styles.dropZone} ${file !== null ? styles.dropZoneActive : styles.dropZoneInactive}`}
                                    >
                                        <input ref={fileRef} onChange={(e) => { handleFile(e.target.files?.[0]) }} type='file' accept='image/*' hidden />
                                        <Image src={'/Admin/Icons/uploadn.svg'} width={30} height={30} alt='upload' />

                                        <span className={styles.uploadTextContainer}>
                                            Click or drag image to upload
                                            <span className={styles.uploadFormats}>PNG, JPG, SVG up to 5MP</span>
                                        </span>

                                        {file !== null && (
                                            <span className={styles.fileNameRow}>
                                                {file.name}
                                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFile(null); setPreview(null); if (fileRef.current) { fileRef.current.value = "" } }} className={styles.deleteFileBtn}>
                                                    <svg className={styles.svgAlign} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4a4a4a">
                                                        <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
                                                    </svg>
                                                </span>
                                            </span>
                                        )}
                                    </label>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={`${styles.fieldGrid} ${styles.marginRight50} ${styles.flex1} ${styles.marginTop1}`}>
                                        <span className={styles.fieldLabel}>Product name</span>
                                        <input className={styles.textInput} maxLength={35} value={name ?? ""} onChange={(e) => { setName(e.target.value); setNameLength(e.target.value.length) }} type="text" />
                                        <span className={styles.charCounter}>{nameLength} / 35</span>
                                    </div>
                                    <div className={styles.marignTopNegat}>
                                        <div className={`${styles.fieldGrid} ${styles.flex1} ${styles.selectHeight} ${styles.marginTop1}`}>
                                            <span className={styles.fieldLabel}>Product Category</span>
                                            <select className={styles.selectInput} value={category as string} onChange={(e) => { setCategory(e.target.value); }}>
                                                {categories.map(cat => (<option key={cat.id}>{cat.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={`${styles.fieldGrid} ${styles.marginTop50}`}>
                                        <span className={styles.fieldLabel}>Description</span>
                                        <textarea maxLength={330} value={description !== null ? description : ""} onChange={(e) => { setDescription(e.target.value); setDescriptionLength(e.target.value.length) }} className={`${styles.textareaInput} ${styles.marginRight50}`} />
                                        <span className={styles.charCounter}>{DescriptionLength} / 330</span>
                                    </div>
                                    <div className={`${styles.fieldGrid} ${styles.marginTop50}`}>
                                        <span className={styles.fieldLabel}>Features</span>
                                        <textarea maxLength={330} value={features ?? ""} onChange={(e) => { setFeatures(e.target.value); setFeaturesLength(e.target.value.length) }} className={styles.textareaInput} />
                                        <span className={styles.charCounter}>{FeaturesLength} / 330</span>
                                    </div>
                                </div>

                                <div className={`${styles.formRow} ${styles.marginTop50}`}>
                                    <div className={`${styles.fieldGrid} ${styles.flex1} ${styles.marginRight50}`}>
                                        <span className={styles.fieldLabel}>Stock quantity</span>
                                        <input value={stock !== null ? stock : ""} onChange={(e) => { setStock(Number(e.target.value) >= 0 ? e.target.value : toast.error("Stock cannot be negative", { id: "stock-negative" }) && "") }} className={styles.numberInputFull} type="number" />
                                    </div>
                                    <div className={`${styles.fieldGrid} ${styles.flex1} ${styles.marginRight50}`}>
                                        <span className={styles.fieldLabel}>Delivery time</span>
                                        <div className={styles.flexRow}>
                                            <input value={time !== null ? time : ""} onChange={(e) => { setTime((e.target as HTMLInputElement).value === "" ? ("") : Number(e.target.value) > 0 && Number(e.target.value) <= 28 ? e.target.value : toast.error("Days cannot be negative or more than 4 weeks", { id: "time-negative" }) && "") }} className={styles.numberInputFull} type="number" />
                                            <span className={styles.unitText}>Days</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.formRow} ${styles.marginTop50}`}>
                                    <div className={`${styles.fieldGrid} ${styles.width500} ${styles.colorGrey}`}>
                                        <span className={styles.fieldLabel}>Price</span>
                                        <div className={styles.flexRow}>
                                            <input value={price !== null ? price : ""} onChange={(e) => { setPrice(e.target.value === "" ? ("") : Number(e.target.value) > 0 ? e.target.value : toast.error("Price cannot be negative or equals zero.", { id: "price-negative" }) && "") }} className={styles.numberInputFull} type="number" />
                                            <span className={styles.unitText}>SAR</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.fieldGrid} ${styles.width500} ${styles.colorGrey} ${styles.marginLeft30}`}>
                                        <span className={styles.fieldLabel}>Old price</span>
                                        <div className={styles.flexRow}>
                                            <input value={oldPrice !== null ? oldPrice : ""} onChange={(e) => setOldPrice(e.target.value === "" ? ("") : (Number(e.target.value) <= 0 && (e.target.value) !== "" && Number(e.target.value) !== null ? (toast.error("Old price cannot be negative or equals zero.", { id: "oldPrice-negative" }) && "") : e.target.value))} className={styles.numberInputFull} type="number" />
                                            <span className={styles.unitText}>SAR</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actionsFooterRow}>
                                    <div className={styles.mainActionsContainer}>
                                        <button className={styles.saveChan} onClick={() => handleSave()}>Save changes</button>
                                        <Link href='/Admin/Products' className={styles.cancel}>Cancel</Link>
                                    </div>
                                    <button className={styles.reset} onClick={() => FormsReset()}>Empty all</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
