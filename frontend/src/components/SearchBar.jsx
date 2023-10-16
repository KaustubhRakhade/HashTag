import React, { useState } from 'react'
import styles from "../styles/SearchBar.module.css"
import Icon from "./Icon"

export default function SearchBar({handleSearch}) {

  const [query, setQuery] = useState("")

  return (
    <div className={styles.searchBar + " " + (query.length ? styles.notEmpty : "")}>
      <Icon name="search" styles={styles.icon}/>
      <input
        className={styles.searchInput}
        type="text"
        placeholder='Search'
        value={query}
        onChange={(e) => { setQuery(e.target.value) }}
        onKeyDown={(e) => { if (e.key == "Enter") { handleSearch(query) } }}/>
    </div>
  )
}
