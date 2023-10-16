import { SEARCH_API } from "../constants"

const useSearchFeed = async (q) => {
    let resp
    try {
        resp = await fetch(SEARCH_API + q)
    }
    catch (err) {
        console.log(err)
    }
    let jsonText = await resp.text();
    let searchFeed = JSON.parse(jsonText);

    return(searchFeed)
}

export default useSearchFeed