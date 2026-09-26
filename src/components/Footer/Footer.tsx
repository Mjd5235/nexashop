import React from 'react'
import styles from './Footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { footerItems } from './data'

const InterSans = Inter({
  subsets: ["latin"],
  weight: ['900']
});

export default function Footer() {

  return (
    <div className={styles.Footer} id="about">
      <div className={styles.three}>
        <div className={styles.aboutSec}>
          <div className={styles.logo}>
            <Link href='/'>
              <div className={InterSans.className}>
                <span>Nexa</span><span className={styles.blueLogo}>Shop</span>
              </div>
            </Link>
          </div>
          <div className={styles.logodes}>
            <p>NexaShop is your trusted destination for the latest electronics, from smartphones to computers and accessories. We aim to provide the best online shopping experience with high-quality products and exceptional customer service. Stay connected for the latest deals and updates.</p>
          </div>

        </div>

        <div className={styles.follow}>
          <h4>follow us on</h4>
          <div className={styles.contacts}>
            <Image className={styles.contact} src={'/contact/you.webp'} quality={60} sizes='28px' width={28} height={20.14} alt='youtube' />
            <Image className={styles.contact} src={'/contact/face.webp'} quality={60} sizes='23px' width={23} height={23} alt='facebook' />
            <Image className={styles.contact} src={'/contact/ins.webp'} quality={60} sizes='23px' width={23} height={23} alt='instagram' />
            <Image className={styles.contact} src={'/contact/twi.webp'} quality={60} sizes='23px' width={23} height={18.69} alt='twitter(X)' />
            <Image className={styles.contact} src={'/contact/lin.webp'} quality={60} sizes='23px' width={23} height={23} alt='linkedin' />
          </div>
        </div>
        <div className={styles.appimgs}>
          <Image className={styles.Goapp} src={'/Application/google.webp'} quality={60} sizes='150px' width={150} height={45} alt='google-play' />
          <Image className={styles.Apapp} src={'/Application/apple.webp'} quality={60} sizes='134.1px' width={134.1} height={45} alt='apple-store' />
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

    </div >
  )
}