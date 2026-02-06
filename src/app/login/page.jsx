"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from '../signup/SignUp.module.css'
import LoginLogo from "../../elements/LoginLogo/LoginLogo"
import Image from "next/image";

export default function Page() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false)
  const [wrongPass, setWrongPass] = useState(false)
  const[isViewed, setIsViewed] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const ViewPass = () =>{
    if(isViewed === false){setIsViewed(true)}
    else{setIsViewed(false)}
  }

  const router = useRouter()

  const SubButton = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem("users",) || [])

    const user = users.find(u=> u.email === email && u.password === password)
    const inpass = users.find(u=> u.password === password)
    const inemail = users.find(u=> u.email === email)

    if( !inpass){setPasswordError("Password is invaild"); setWrongPass(true)}
    if(!inemail){setEmailError("Email is invaild"); setWrongEmail(true)}

  if(user && inpass && inemail){
      localStorage.setItem('user', JSON.stringify({name: user.name}))
      alert("Logged in successfully")
      router.push('/')
    }}


  return (
    <div className={styles.container}>
        <LoginLogo /><Link href="/"><Image src={'/help_icons/backarrow.png'} width={50} height={50} style={{marginBottom: "520px", cursor: "pointer"}} alt="HelpIcon"/></Link><LoginLogo />
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome back</h2>
        
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={u => {setEmail(u.target.value); setWrongEmail(false)}}
              required
              style={{border: wrongEmail ? "solid 1px red" : null}}
            />
            {wrongEmail ? <p style={{color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "3px"}}>{emailError}</p> : null}
          </div>

          <div className={styles.formGroup}>
            <div style={{display: "flex"}}>
              <label>Password</label></div>
            <input
              type= {isViewed ? "text" : "password"}
              name="password"
              placeholder=""
              value={password}
              onChange={u => {setPassword(u.target.value); setWrongPass(false)}}
              required
              style={{border: wrongPass ? "solid 1px red" : null}}
            /><Image src={'/help_icons/visible.png'} width={20} height={20} style={{cursor: "pointer", marginRight: "5px", marginTop: "-32px", marginLeft: "305px"}} onClick={ViewPass} alt="HelpIcon"/>
            {wrongPass === true ? <p style={{color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "15px"}}>{passwordError}</p> : null}
          </div>

          <button style={{marginTop: "32px"}} type="submit" onClick={SubButton} className={styles.button}>
            Log In
          </button>
        </form>

        <p className={styles.text}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}