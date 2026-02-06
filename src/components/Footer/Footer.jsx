import React from 'react'
import styles from './Footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { footerItems } from './data'

const MontserratSans = Montserrat({
  subsets: ["latin"],
  weight: ['900']
});

export default function Footer() {
    
  return (
    <div className={styles.Footer} id="about">
      <div className={styles.three}>
              <div className={styles.logo}>
          <Link className={styles.mainlogo} href='/'>
          <div className={MontserratSans.className}>
            NexaShop
           </div>
        </Link>
        <div className={styles.logodes}>
          <p>NexaShop is your trusted destination for the latest electronics, from smartphones to computers and accessories. We aim to provide the best online shopping experience with high-quality products and exceptional customer service. Stay connected for the latest deals and updates.</p>
        </div>

    </div>

        <div className={styles.follow}>
          <h4 style={{justifyContent: "center", display: "flex"}}>follow us on</h4>
          <div className={styles.contacts}>
          <Image className={styles.contact} src={'/contact/you.webp'} width={28} height={23} alt='contact1'/>
          <Image className={styles.contact} src={'/contact/face.webp'} width={23} height={23} alt='contact2'/>
          <Image className={styles.contact} src={'/contact/ins.webp'} width={23} height={23} alt='contact3'/>
          <Image className={styles.contact} src={'/contact/twi.webp'} width={23} height={23} alt='contact4'/>
          <Image className={styles.contact} src={'/contact/lin.webp'} width={23} height={23} alt='contact5'/>
        </div>
        </div>
            <div className={styles.appimgs}>
      <Image className={styles.apps} src={'/Application/google.webp'} width={150} height={50} alt='google'/>
      <Image className={styles.apps} src={'/Application/apple.webp'} width={150} height={50} alt='google'/>
    </div>
    </div>
    <ul className={styles.footerlinks}>
      {footerItems.map(link => 
        <li className={styles.but} key={link.key}>
        <Link href={link.url}>
          {link.title}
        </Link>
      </li>
    )}
    </ul>
    <div className={styles.copyrights}>Copyright ©2026 NexaShop. All rights reserved.</div>
    
    </div>
  )
}