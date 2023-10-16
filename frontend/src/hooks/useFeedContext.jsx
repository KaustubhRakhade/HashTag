import { FeedContext } from "../context/FeedContext";
import { useContext } from "react";

const useFeedContext = () => {
    const context = useContext(FeedContext)

    if (!context) {
        throw Error("useFeedContext must be used inside a FeedContextProvider!" )
    }

    return context
}

export default useFeedContext