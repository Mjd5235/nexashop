import Link from 'next/link'
import styles from './Hero.module.css'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'

const HeroTextFont = Montserrat({
  subsets: ['latin'],
})

export default function Hero() {

  
  return (
    <div className={styles.hero}>
        <div>
            <Image className={styles.heroimg} src={'/Hero/hero.jpg'} width={675} height={450} alt={"hero"}/>
        </div>
        <div className={`${styles.herotext} ${HeroTextFont.className}`}>
          <Link href='/'><h1 className={styles.logoname}>
          NexaShop
        </h1></Link>
          <h1> —Where Majdjfd</h1><h1> Meets Shopping</h1><h1 className={styles.logoname}>Excellence.</h1></div>
        <div className={styles.space}>
        <div className={styles.twobut}>
        <div>
          <Link href='#about' scroll={true} className={styles.learn}>
            Learn More
          </Link>
          </div>
    
            <div>
          <Link href='#products' scroll={true} className={styles.shop}>
            Shop Now
          </Link>
          </div>
        </div>
        </div>
    </div>
  )
}