"use client";
import { useState } from "react";
import Link from "next/link";
import styles from './SignUp.module.css'
import SignLogo from "@/elements/SignLogo/SignLogo";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [PasswordError, setPasswordError] = useState("")
  const [ConPasswordError, setConPasswordError] = useState("")
  const [NameError, setNameError] = useState("")
  const [wrongEmail, setWrongEmail] = useState(false)
  const [wrongPass, setWrongPass] = useState(false)
  const [wrongConPass, setWrongConPass] = useState(false)
  const [wrongName, setWrongName] = useState(false)
  const[isViewed, setIsViewed] = useState(false)
  const[isConViewed, setIsConViewed] = useState(false)
  const router = useRouter()
  

  const ViewPass = () =>{
    if(isViewed === false){setIsViewed(true)}
    else{setIsViewed(false)}
  }

    const ViewConPass = () =>{
    if(isConViewed === false){setIsConViewed(true)}
    else{setIsConViewed(false)}
  }
      
  const Submit = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const exists = users.find(u => u.email === email);
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const con1 = password !== confirmPassword;
    const con2 = password == null;
    const con3 = password.length < 8;
    const con4 = EmailRegex;
    const con5 = name.length < 1;
    
    if(exists && con4 && !con1 && !con2 && !con3 && !con5){
      alert("This email is already registered.")
      router.push('/login')
    }

    if(con2 || con3){setPasswordError("Password must be at least 8 characters long."); setWrongPass(true)}
    if(con1){setConPasswordError("Password doesn't confirms"); setWrongConPass(true)}
    if(!con4){setEmailError("Please enter a valid email address."); setWrongEmail(true)}
    if(con5){setNameError("Name is invaild"); setWrongName(true)}
    
  if( !exists && !con1 && !con2 && !con3 && con4 && !con5){
      users.push({email, password, name})
      localStorage.setItem("users", JSON.stringify(users)) 
      alert("Sign up successful!")
      router.push('/login')
    }
  }


  return (
    <div>      
      <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center"}}><SignLogo /><Link href="/"><Image className={styles.arrow2} src={'/help_icons/backarrow.png'} width={50} height={50} style={{ cursor: "pointer", left: "350px", position: "absolute"}} alt="BackIcon"/></Link></div>
<div className={styles.container}>
    
      <div className={styles.card}>
        <h2 className={styles.title}>Create your account</h2>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={name}
              onChange={u => {setName(u.target.value); setWrongName(false)}}
              required
              style={{border: wrongName ? "solid 1px red" : null, backgroundColor: "white"}}
            />
            {wrongName ? <p style={{color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "3px"}}>{NameError}</p> : null}
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={u=>{ setEmail(u.target.value); setWrongEmail(false)}}
              required
              style={{border: wrongEmail ? "solid 1px red" : null, backgroundColor: "white"}}
            />
            {wrongEmail ?<p style={{color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "3px"}}>{emailError}</p> : null}
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type= {isViewed ? "text" : "password"}
              name="password"
              placeholder=""
              value={password}
              onChange={u => {setPassword(u.target.value); setWrongPass(false)}}
              required
              style={{border: wrongPass ? "solid 1px red" : null, backgroundColor: "white"}}
            />
            <Image src={'/help_icons/visible.png'} width={20} height={20} style={{cursor: "pointer", marginRight: "15px", marginTop: "-32px", marginLeft: "290px"}} onClick={ViewPass} alt="HelpIcon"/>
            {wrongPass ? <p style={{color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "15px"}}>{PasswordError}</p> : null}
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type= {isConViewed ? "text" : "password"}
              name="confirmPassword"
              placeholder=""
              value={confirmPassword}
              onChange={u => {setConfirmPassword(u.target.value); setWrongConPass(false)}}
              required
              style={{border: wrongConPass ? "solid 1px red" : null, backgroundColor: "white"}}
            />
            <Image src={'/help_icons/visible.png'} width={20} height={20} style={{cursor: "pointer", marginRight: "5px", marginTop: "-32px", marginLeft: "290px"}} onClick={ViewConPass} alt="HelpIcon"/>
            {wrongConPass ? <p style={{color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "15px"}}>{ConPasswordError}</p> : null}
          </div>

          <button style={{marginTop: "32px"}} type="submit" onClick={Submit} className={styles.button}>
            Sign Up
          </button>
        </form>

        <p className={styles.text}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </div>
    </div>
  )
}