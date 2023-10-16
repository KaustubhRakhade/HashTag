import React, { useState } from 'react'
import styles from "../styles/FeedItem.module.css"
import Icon from './Icon';

const timeAgo = (time) => {
  const date = (time instanceof Date) ? time : new Date(time);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}


export default function FeedItem({item, key, active, setActive}) {

  const pubAt = new Date(item.time)

  return (
    <div className={styles.feedItem} onClick={setActive}>
      <div className={styles.itemText}>
        <span className={styles.info}>By <b>{item.author}</b>  &bull;  {timeAgo(pubAt)}</span>
        <h3 className={styles.title}>{item.title}</h3>
        <span className={styles.content + " " + (active ? styles.active : "")}>{item.content}</span>
        <a className={styles.link} target="_blank" href={item.url}>Read full article on TOI <Icon name="open_in_new"/></a>
      </div>
      <img className={styles.thumbnail} src={item.image} alt="image" />

    </div>
  )
}
