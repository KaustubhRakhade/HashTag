import React, { useEffect, useRef, useState } from 'react'
import styles from "../styles/TopicsTab.module.css"
import Icon from './Icon'
import { CITIES, TOPICS } from '../constants'
import LocalNews from './LocalNews'
import Subscribe from './Subscribe'

export default function TopicsTab({topic, setTopic}) {

  const [slideBtnVis, setSlideBtnVis] = useState([false, true])
  
  const elem = useRef();
  const slider = useRef();

  const handleTopicClick = (t) => {
    setTopic(t)
  }

  const handleScroll = (e, final) => {
    console.log(final)
    let start = 0
    let end = slider.current.scrollWidth - elem.current.offsetWidth

    let slideVal = slider.current.scrollLeft
    if (final) {
      slideVal = Math.min(Math.max(start, final), end)
    }

    setSlideBtnVis([
      Math.abs(slideVal - start) > 1.6, 
      Math.abs(slideVal - end) > 1.6, 
    ])
  }

  const handleScrollButton = (dir) => {
    handleScroll(null, slider.current.scrollLeft + 150*dir)
    slider.current.scroll({
      left: slider.current.scrollLeft + 150*dir,
      behavior: "smooth"
    })
  }


  useEffect(() => {
    elem.current.addEventListener("wheel", handleScroll)

    let temp = elem.current;

    return (() => {
      temp.removeEventListener("wheel", handleScroll)
    })
  })
    
  return (
    <>
      <div className={styles.subscribeMobile}>
        <Subscribe/>
      </div>
      <div className={styles.topicsTab} ref={elem}>
        {
          slideBtnVis[0] &&
          <div className={styles.slideLeft} onClick={() => { handleScrollButton(-1) }}>
            <Icon name="navigate_before"/>
          </div>
        }


        <div className={styles.slider} ref={slider}>
          {
            TOPICS.map((t, index) => {
                return (
                    <div className={styles.topic + " " + ((t == topic || (t == "Local" && CITIES.includes(topic))) ? styles.active : "")} key={index} onClick={() => { handleTopicClick(t) }}>{t}</div>
                )
            })
          }
        </div>

        {
          slideBtnVis[1] &&
          <div className={styles.slideRight} onClick={() => { handleScrollButton(1) }}>
            <Icon name="navigate_next"/>
          </div>
        }
      </div>

      {
        (topic == "Local" || CITIES.includes(topic)) &&
        <LocalNews topic={topic} setTopic={setTopic}/>
      }

    </>
  )
}
