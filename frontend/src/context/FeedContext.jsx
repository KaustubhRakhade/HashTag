import { createContext, useReducer, useEffect } from "react";
import { TOPICS } from "../constants";

export const FeedContext = createContext()

export const feedReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            let updatedFeed = {...state.feed}
            updatedFeed[action.payload.topic] = action.payload.topicFeed

            console.log(updatedFeed)
            return {
                feed: updatedFeed
            }

        default:
            return state
    }
}

export const FeedContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(feedReducer, {
        feed: {}
    })

    //run just once at the start
    useEffect(() => {
        const feed = {}
        TOPICS.forEach((t) => {
            feed[t] = []
        })

        console.log(feed)
    }, [])

    return(
        <FeedContext.Provider value={{...state, dispatch}}>
            { children }
        </FeedContext.Provider>
    )
}