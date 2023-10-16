import { FEED_API } from "../constants"

const useUpdateFeed = async (topic) => {
    let resp
    try {
        resp = await fetch(FEED_API + topic)
    }
    catch (err) {
        console.log(err)
    }
    let jsonText = await resp.text();
    let topicFeed = JSON.parse(jsonText);

    return(topicFeed)
}

export default useUpdateFeed