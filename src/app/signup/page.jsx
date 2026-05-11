"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from './SignUp.module.css'
import SignLogo from "@/elements/SignLogo/SignLogo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/SubaBaseClient";

export default function Page() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [NameError, setNameError] = useState("Name is required")
  const [emailError, setEmailError] = useState("Please enter a valid email address")
  const [RegesteredError, setRegesteredError] = useState("This email is already registered. Try signing in instead")
  const [PasswordError, setPasswordError] = useState("Password should be at least 6 characters.")
  const [ConPasswordError, setConPasswordError] = useState("Password do not match")

  const [emptyEmail, setEmptyEmail] = useState("Email is required")
  const [emptyPassword, setEmptyPassword] = useState("Password is required")

  const [emptyEmailError, setEmptyEmailError] = useState(false)
  const [emptyPasswordError, setEmptyPasswordError] = useState(false)

  const [WrongName, setWrongName] = useState(false)
  const [WrongEmail, setWrongEmail] = useState(false)
  const [WrongReg, setWrongReg] = useState(false)
  const [WrongPassword, setWrongPassword] = useState(false)
  const [WrongConPass, setWrongConPass] = useState(false)

  const [isViewed, setIsViewed] = useState(false)
  const [isConViewed, setIsConViewed] = useState(false)

  const router = useRouter()

  const Submit = async (e) => {
    e.preventDefault()

    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const emailType = EmailRegex;

    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        if (name !== "" && name !== null) {
          if (emailType) {

            const { error } = await supabase.auth.signUp(
              {
                email: email.trim(),
                password: password,
                options: {
                  data: {
                    name: name,
                  }
                }
              }
            )
            if (error && error.message === "User already registered") {
              setWrongReg(true)
            }
            if (error) {
              console.log(error.message)
            }
            else {
              router.push('/login?signup=success')
              const { error } = await supabase.auth.signOut()
            }
          }
        }
      }
      else {
        setWrongConPass(true)
      }
    } else {
      if (name === "" && email === "" && password === "" && confirmPassword === "") {
        setWrongName(true)
        setEmptyEmailError(true)
        setEmptyPasswordError(true)
      }
    }
    if (password.length < 6 && password !== "") { setWrongPassword(true) }
    if (name === "") { setWrongName(true) }
    if (email === "") { setEmptyEmailError(true) }
    if (password === "") { setEmptyPasswordError(true) }
    if (confirmPassword === "" && password !== "") setWrongConPass(true)
    if (password !== confirmPassword) { setWrongConPass(true) }
    if (!emailType && email !== "") { setWrongEmail(true) }
  }


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}><SignLogo /><Link href="/"><Image className={styles.arrow2} src={'/help_icons/backarrow.png'} width={50} height={50} style={{ cursor: "pointer", left: "350px", position: "absolute" }} alt="BackIcon" /></Link></div>
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
                onChange={u => { setName(u.target.value); WrongName === true && setWrongName(false); }}
                required
                style={{ border: WrongName === true ? "solid 1px red" : null, backgroundColor: "white" }}
              />
              {WrongName === true ? <p style={{ color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "3px" }}>{NameError}</p> : null}
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={u => { setEmail(u.target.value); WrongEmail === true && setWrongEmail(false); WrongReg === true && setWrongReg(false); emptyEmail && setEmptyEmailError(false) }}
                required
                style={{ border: WrongEmail === true || WrongReg === true || emptyEmailError === true ? "solid 1px red" : null, backgroundColor: "white" }}
              />
              {WrongEmail === true || WrongReg === true || emptyEmailError === true ? <p style={{ color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "3px" }}>{WrongEmail === true ? emailError : WrongReg === true ? RegesteredError : emptyEmailError === true ? emptyEmail : null}</p> : null}
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type={isViewed ? "text" : "password"}
                name="password"
                placeholder=""
                value={password}
                onChange={u => { setPassword(u.target.value); WrongPassword === true && setWrongPassword(false); setWrongConPass(false); emptyPasswordError === true && setEmptyPasswordError(false); }}
                required
                style={{ border: WrongPassword === true || emptyPasswordError === true ? "solid 1px red" : null, backgroundColor: "white" }}
              />
              <Image src={'/help_icons/visible.png'} width={20} height={20} style={{ cursor: "pointer", marginRight: "15px", marginTop: "-32px", marginLeft: "290px" }} onClick={() => { setIsViewed(prev => !prev) }} alt="HelpIcon" />
              {WrongPassword === true || emptyPasswordError === true ? <p style={{ color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "15px" }}>{WrongPassword === true ? PasswordError : emptyPassword}</p> : null}
            </div>

            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <input
                type={isConViewed ? "text" : "password"}
                name="confirmPassword"
                placeholder=""
                value={confirmPassword}
                onChange={u => { setConfirmPassword(u.target.value); WrongConPass === true && setWrongConPass(false) }}
                required
                style={{ border: WrongConPass === true ? "solid 1px red" : null, backgroundColor: "white" }}
              />
              <Image src={'/help_icons/visible.png'} width={20} height={20} style={{ cursor: "pointer", marginRight: "5px", marginTop: "-32px", marginLeft: "290px" }} onClick={() => { setIsConViewed(prev => !prev) }} alt="HelpIcon" />
              {WrongConPass === true ? <p style={{ color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "15px" }}>{ConPasswordError}</p> : null}
            </div>

            <button style={{ marginTop: "32px" }} type="submit" onClick={Submit} className={styles.button}>
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