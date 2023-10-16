import { useContext } from 'react'
import styles from "../styles/Navbar.module.css"
import SearchBar from './SearchBar'
import { ThemeContext } from "../context/ThemeContext"

export default function Navbar({handleSearch}) {

  const { dispatch, theme } = useContext(ThemeContext)

  const switchTheme = () => {
    let newtheme = (theme == "light") ? "dark" : "light"

    dispatch({
      type: "UPDATE",
      payload: newtheme
    })
  }

  return (
    <div className={styles.navbar}>
        <div className={styles.navTitle}>
            <span className={styles.logo}>#</span>
            <h1>HashTag</h1>
        </div>
        <SearchBar handleSearch={handleSearch}/>
        <div className={styles.themeSelect} onClick={switchTheme}>
          <span
            className={
              "material-symbols-rounded" + " " +
              styles.lightMode + " " +
              ((theme == "light") ? styles.active : "")
            }>light_mode</span>
          <span
            className={
              "material-symbols-rounded" + " " +
              styles.darkMode + " " +
              ((theme == "dark") ? styles.active : "")
            }>dark_mode</span>
        </div>
    </div>
  )
}
