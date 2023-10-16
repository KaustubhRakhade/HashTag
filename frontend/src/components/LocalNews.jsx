import React from 'react'
import { CITIES } from '../constants'
import styles from '../styles/LocalNews.module.css'

export default function LocalNews({topic, setTopic}) {
  return (
    <div className={styles.localNews}>
        {
            CITIES.map((c) => {
                return (
                    <span className={styles.city + " " + (c == topic ? styles.active : "")} onClick={() => { setTopic(c) }}>{c}</span>
                )
            })
        }
    </div>
  )
}
