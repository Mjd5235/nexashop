import React from 'react'
import { supabase } from '@/lib/SubaBaseClient'
import { useRouter } from 'next/navigation'
import styles from '../../Dashboard/page.module.css'

export default function LogOutButton() {

    const router = useRouter()
    
      const handleOut = async(e) => {
        e.preventDefault()
    
        const{data, error} = await supabase.auth.signOut()
    
        if(error){
          alert(error.message)
        }
        else{
          window.location.href = "/Admin/Login"
          router.refresh()
        }
      }

  return (
    <div>
      <button className={styles.logout} style={{marginTop: "40px", whiteSpace: "nowrap", padding: "20px", borderRadius: "32px", color: "white", cursor: "pointer", zIndex: "10", border: "none"}} onClick={handleOut}>Log Out</button>
    </div>
  )
}