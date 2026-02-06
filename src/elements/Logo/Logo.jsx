import Link from 'next/link';
import styles from './Logo.module.css'
import { Montserrat } from 'next/font/google'

const MontserratSans = Montserrat({
  subsets: ["latin"],
  weight: ['900']
});

export default function Logo() {
  return (
        <div className={styles.logo}>
          <Link href='/'>
          <div className={MontserratSans.className}>
            NexaShop
           </div>
        </Link>
    </div>
  )
}