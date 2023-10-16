import convertXML from "xml-js"
import { TOPIC_PROVIDERS } from "../constants"

// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
const CORS_PROXY = "https://api.allorigins.win/raw?url="

const useUpdateFeed = async (topic) => {
    let resp
    try {
        resp = await fetch(CORS_PROXY + TOPIC_PROVIDERS[topic])
    }
    catch (err) {
        console.log(err)
    }
    let xml = await resp.text();
    let json = JSON.parse(convertXML.xml2json(xml, {compact: true, spaces: 0}));
    let list = json.rss.channel.item;

    let topicFeed = list.map((item) => {
        return ({
            "title": item.title._text,
            "content": item.description._cdata,
            "image": item.enclosure._attributes.url,
            "author": item["dc:creator"]._text,
            "time": Date.parse(item.pubDate._text.split(", ")[1]),
            "url": item.link._text
        })
    })

    return(topicFeed)
}

export default useUpdateFeed