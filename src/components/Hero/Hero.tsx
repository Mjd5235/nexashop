import Link from 'next/link'
import styles from './Hero.module.css'
import { Inter } from 'next/font/google'
import Image from 'next/image';

const InterSans = Inter({
  subsets: ["latin"],
  weight: ['900']
});

export default function Hero() {

  return (
    <div className={`${styles.hero}`}>
      <div className={`${styles.herotext}`}>
        <div className={styles.textWrapper}>
          <Link href='/'>
            <h1 className={`${InterSans.className} ${styles.logoname}`}>
              <span>Nexa</span>
              <span className={styles.shopText}>Shop</span>
            </h1>
          </Link>
          <div className={styles.heroNormalText}><span> —Where Innovation</span><span> Meets Shopping </span><span className={styles.excelText}> Excellence.</span></div></div>
        <div className={styles.space}>
          <div className={styles.twobut}>
            <Link href='#products' scroll={true} className={styles.shop}>
              Shop Now
              <svg className={styles.arrowIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <div>
              <Link href='#about' scroll={true} className={styles.learn}>
                Learn More
                <svg className={styles.arrowIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
          <div className={styles.Herofeatures}>
            <div className={styles.heroFeature}><div className={styles.heroFeatureImg}><Image className={styles.heroFI} fill src={'/Hero/secure_payments.png'} alt='secure-icon' /></div>secure payments </div>
            <div className={styles.heroFeature}><div className={styles.heroFeatureImg}><Image className={styles.heroFI} fill src={'/Hero/fast_delivery.png'} alt='fast-icon' /></div>Fast & Free Delivery</div>
            <div className={styles.heroFeature}><div className={styles.heroFeatureImg}><Image className={styles.heroFI} fill src={'/Hero/premium_quality.png'} alt='premium-icon' /></div>Premium Quality</div>
            <div className={styles.heroFeature}><div className={styles.heroFeatureImg}><Image className={styles.heroFI} fill src={'/Hero/support.png'} alt='support-icon' /></div>24/7 Support</div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}