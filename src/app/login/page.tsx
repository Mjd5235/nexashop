"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Image from "next/image";
import styles from './page.module.css'
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

  const hasShown = useRef<boolean>(false)

  useEffect(() => {
    if (hasShown.current === false && searchParams.get('signup') === 'success') {

      toast.success('Account created successfully. Please sign in.');
      router.replace('/login')
      hasShown.current = true;

    }
  }, [searchParams])


  const SubButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const emailType = EmailRegex;

    if (email !== "" && password !== "") {
      if (emailType) {
        const { error, } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        })

        if (error) {
          if (error.message === "Invalid login credentials") {
            setWrongLog(true)
          } else {
            toast.error("Failed to login.", { id: "flogin" })
            console.error(error)
          }
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
      <div className={styles.backWrapper}>
        <Link href="/">
          <Image
            className={`${styles.arrow} ${styles.backIcon}`}
            src={'/help_icons/backarrow.png'}
            width={50}
            height={50}
            alt="BackIcon"
          />
        </Link>
      </div>

      <div className={styles.container}>
        <div className={styles.card}>
          <LoginLogo />
          <h2 className={styles.title}>Welcome back</h2>

          {wrongLog ? (
            <div className={styles.errorWrapper}>
              <p className={styles.loginError}>
                {LoginError}
              </p>
            </div>
          ) : null}

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={u => {
                  setEmail(u.target.value);
                  setWrongEmail(false);
                  setWrEmptyEmail(false);
                  setWrongLog(false);
                }}
                required
                style={{
                  border: wrongEmail || wrEmptyEmail || wrongLog ? "solid 1px red" : "",
                  backgroundColor: "white"
                }}
              />

              {wrongEmail || wrEmptyEmail ? (
                <p className={styles.inputError}>
                  {wrongEmail === true ? emailError : emptyEmail}
                </p>
              ) : null}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordLabelWrapper}>
                <label>Password</label>
              </div>

              <input
                type={Viewed ? "text" : "password"}
                name="password"
                placeholder=""
                value={password}
                onChange={u => {
                  setPassword(u.target.value);
                  setWrongPass(false);
                  setWrongLog(false);
                }}
                required
                style={{
                  border: wrongPass || wrongLog ? "solid 1px red" : "",
                  backgroundColor: "white"
                }}
              />

              <Image
                src={'/help_icons/visible.png'}
                width={20}
                height={20}
                className={styles.visibleIcon}
                onClick={() => {
                  setViewed(prev => !prev);
                }}
                alt="HelpIcon"
              />

              {wrongPass === true ? (
                <p className={styles.passwordError}>
                  {emptyPassword}
                </p>
              ) : ""}
            </div>

            <button
              className={`${styles.button} ${styles.loginButton}`}
              type="submit"
              onClick={SubButton}
            >
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
    </div >

  );
}

export default function page() {
  return (
    <Suspense fallback={<div></div>}>
      <LoginContents />
    </Suspense>
  )
}