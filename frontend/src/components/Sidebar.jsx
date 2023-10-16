import React from 'react'
import styles from "../styles/Sidebar.module.css"
import Subscribe from './Subscribe'


export default function Sidebar() {
  return (
    <div className={styles.sideBar}>
      <Subscribe/>
      <div className={styles.disclaimer}>
        Disclaimer: All the news item have been scraped through the RSS feeds of Times Of India.
      </div>
    </div>
  )
}
