import Link from "next/link"
import styles from './Sign.module.css'
import { Montserrat } from 'next/font/google'

const MontserratSans = Montserrat({
  subsets: ["latin"],
  weight: ['900']
});

export default function SignLogo() {
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