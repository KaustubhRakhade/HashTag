import React, { useState } from 'react'
import styles from "../styles/Subscribe.module.css"
import { SUBSCRIBE_API } from '../constants'

export default function Subscribe() {

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async () => {
    setError("")
    try {
      let resp = await fetch(SUBSCRIBE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"email": email})
      })
      let json = await resp.json()

      if (resp && resp.ok) {
        setIsSubscribed(true)
      }
      else {
        setError(json.error)
      }

    }
    catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={styles.subscribeBox}>
      {
      !isSubscribed ? //Not Subscribed
        <> 
          <span className={styles.header}>Stay updated with what's Trending</span>
          <span className={styles.subheader}>Subscribe to our morning newsletter</span>
          <input
            className={styles.emailInput + " " + (error ? styles.error : "")}
            type="email" placeholder='Enter your email address'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}/>
          <span className={styles.errorText + " " + (error ? styles.error : "")}>{error}</span>
          <input className={styles.subButton} type="button" value="SUBSCRIBE" onClick={handleSubscribe}/>
        </>
        : //Subscribed
        <>
          <span className={styles.header}>You are all set!</span>
          <span className={styles.subheader}>You'll receive our newsletter every morning.</span>

        </>
      }
    </div>
  )
}
