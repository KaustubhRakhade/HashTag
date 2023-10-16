import styles from './styles/App.module.css'
import light from './styles/light.module.css'
import dark from './styles/dark.module.css'
import Navbar from './components/Navbar'
import TopicsTab from './components/TopicsTab'
import NewsFeed from './components/NewsFeed'
import { useEffect, useState, useContext } from 'react'
import { DEFAULT_TOPIC } from './constants'
import useUpdateFeed from './hooks/useUpdateFeed'
import useSearchFeed from './hooks/useSearchFeed'
import { FeedContext } from "./context/FeedContext"
import { ThemeContext } from "./context/ThemeContext"
import Sidebar from './components/Sidebar'

function App() {

  const { dispatch, feed } = useContext(FeedContext)
  const { theme } = useContext(ThemeContext)

  const [topic, setTopic] = useState(DEFAULT_TOPIC)
  const [isSearching, setIsSearching] = useState(false)
  const [searchFeed, setSearchFeed] = useState({})

  const handleSearch = async (q) => {
    if (!q) {
      setIsSearching(false)
    }
    else {
      setSearchFeed(await useSearchFeed(q))
      setIsSearching(true)
    }
  }

  useEffect(() => {

    const getTopicFeed = async () => {
      let topicFeed = await useUpdateFeed(topic)
      dispatch({
          type: "UPDATE",
          payload: {
              topic: topic,
              topicFeed: topicFeed
          }
      })
    }

    getTopicFeed()

  }, [topic])

  return (
    <div className={(theme == "light") ? light.app : dark.app}>
      <Navbar handleSearch={handleSearch}/>
      <div className={styles.main}>
        <div className={styles.mainbar}>
          {
          isSearching
            ? <div className={styles.searchRes}>
              <span className={styles.searchResTitle}>Search Results ({searchFeed.length} results)</span>
              <span className={"material-symbols-rounded " + styles.searchResIcon} onClick={() => { setIsSearching(false) }}>close</span>
            </div>

            : <TopicsTab topic={topic} setTopic={setTopic}/> 
          }
          <NewsFeed feed={isSearching ? searchFeed : feed[topic]}/>
        </div>
        <Sidebar/>
      </div>

    </div>
  )
}

export default App
