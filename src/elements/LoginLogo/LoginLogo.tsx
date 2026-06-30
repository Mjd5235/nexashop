import Link from "next/link"
import styles from './Login.module.css'
import { Inter } from 'next/font/google'

const InterSans = Inter({
  subsets: ["latin"],
  weight: ['900']
});

export default function LoginLogo() {
  return (
    <div className={styles.logo}>
      <Link href='/'>
        <div className={InterSans.className}>
          <span>Nexa</span><span className={styles.blueLogo}>Shop</span>
        </div>
      </Link>
    </div>
  )
}