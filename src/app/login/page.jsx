"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Image from "next/image";
import styles from '../signup/SignUp.module.css'
import LoginLogo from "../../elements/LoginLogo/LoginLogo"
import { supabase } from "@/lib/SubaBaseClient";

function LoginContents() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emptyEmail, setEmptyEmail] = useState("Email is required")
  const [emailError, setEmailError] = useState("Please enter a valid email address.")
  const [emptyPassword, setEmptyPassword] = useState("Password is required")

  const [LoginError, setLoginError] = useState("Invalid email or password")

  const [wrongEmail, setWrongEmail] = useState(false)
  const [wrEmptyEmail, setWrEmptyEmail] = useState(false)
  const [wrongPass, setWrongPass] = useState(false)
  const [wrongLog, setWrongLog] = useState(false)

  const [Viewed, setViewed] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const hasShown = useRef(false)

  useEffect(() => {
    if (hasShown.current === false && searchParams.get('signup') === 'success') {

      toast.success('Account created successfully. Please sign in.');
      router.replace('/login')
      hasShown.current = true;

    }
  }, [searchParams])


  const SubButton = async (e) => {
    e.preventDefault()

    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const emailType = EmailRegex;

    if (email !== "" && password !== "") {
      if (emailType) {
        const { error, } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        })

        if (error && error.message === "Invalid login credentials") { setWrongLog(true) }

        if (error) {
          console.log(error.message)
        }
        else {
          router.push("/?login=success")
        }
      }
    }
    if (email === "" && password === "") { setWrEmptyEmail(true); setWrongPass(true) }
    if (email === "") { setWrEmptyEmail(true); }
    if (password === "") { setWrongPass(true) }
    if (!emailType && email !== "") { setWrongEmail(true) }

  }


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}><LoginLogo /><Link href="/"><Image className={styles.arrow} src={'/help_icons/backarrow.png'} width={50} height={50} style={{ cursor: "pointer", left: "350px", position: "absolute" }} alt="BackIcon" /></Link></div>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome back</h2>

          {wrongLog ? <div style={{ display: 'flex', justifyContent: 'center' }}><p style={{ color: "#C53030", backgroundColor: "#FFF5F5", border: "solid 1px #FEB2B2", width: "330px", padding: "5px", fontSize: "13px", display: 'flex', justifyContent: "center", marginTop: "3px", marginBottom: "16px", }}>{LoginError}</p></div> : null}

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={u => { setEmail(u.target.value); setWrongEmail(false); setWrEmptyEmail(false); setWrongLog(false) }}
                required
                style={{ border: wrongEmail || wrEmptyEmail || wrongLog ? "solid 1px red" : null, backgroundColor: "white" }}
              />
              {wrongEmail || wrEmptyEmail ? <p style={{ color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "3px" }}>{wrongEmail === true ? emailError : emptyEmail}</p> : null}
            </div>

            <div className={styles.formGroup}>
              <div style={{ display: "flex" }}>
                <label>Password</label></div>
              <input
                type={Viewed ? "text" : "password"}
                name="password"
                placeholder=""
                value={password}
                onChange={u => { setPassword(u.target.value); setWrongPass(false); setWrongLog(false) }}
                required
                style={{ border: wrongPass || wrongLog ? "solid 1px red" : null, backgroundColor: "white" }}
              /><Image src={'/help_icons/visible.png'} width={20} height={20} style={{ cursor: "pointer", marginRight: "5px", marginTop: "-32px", marginLeft: "290px" }} onClick={() => { setViewed(prev => !prev) }} alt="HelpIcon" />
              {wrongPass === true ? <p style={{ color: "red", fontSize: "13px", marginLeft: "5px", marginTop: "15px" }}>{emptyPassword}</p> : null}
            </div>

            <button style={{ marginTop: "32px" }} type="submit" onClick={SubButton} className={styles.button}>
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
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<div></div>}>
      <LoginContents />
    </Suspense>
  )
}