import React, { useState } from 'react'
import useFeedContext from '../hooks/useFeedContext'
import styles from "../styles/NewsFeed.module.css"
import FeedItem from "./FeedItem"

export default function NewsFeed({feed}) {

    const [activeIndex, setActiveIndex] = useState(-1)

    const setActive = (index) => {
        setActiveIndex((old) => {

            if (old == index) {
            return -1
            }

            return index
        })
    }

  return (
    <div className={styles.newsFeed}>{
        feed
            ? feed.map((item, index) => {
                return (
                    <FeedItem item={item} key={index} active={index == activeIndex} setActive={() => { setActive(index) }}/>
                )
            })

            : <span className={styles.loading}>Loading...</span>
    }</div>
  )
}
