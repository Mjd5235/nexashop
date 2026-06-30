import React from 'react'
import { supabase } from '@/lib/SubaBaseClient'
import { useRouter } from 'next/navigation'
import styles from './LogOutButton.module.css'
import toast from 'react-hot-toast'

export default function LogOutButton() {

  const router = useRouter()

  const handleOut = async (e: React.MouseEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error("Failed to logout.", { id: "flogout" })
      console.error(error)
    }
    else {
      window.location.href = "/Admin/Login"
      router.refresh()
    }
  }

  return (
    <div>
      <button
        className={styles.logout}
        onClick={handleOut}
      >
        Log Out
      </button>
    </div>
  )
}