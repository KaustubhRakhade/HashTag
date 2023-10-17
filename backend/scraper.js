const convertXML = require("xml-js")
const { TOPIC_PROVIDERS } = require("./constants")
const Feeditem = require("./models/feeditem")
const fetch = require("node-fetch");

const scrapeData = (item, topic) => {

    let content = item.description._text || item.description._cdata || ""
    if (content.includes("</a>")) {
        content = content.split("</a>")[1]
    }

    if (content.includes("/>")) {
        content = content.split("/>")[1]
    }

    return ({
        "title": item.title._text,
        "content": content,
        "image": item.enclosure._attributes.url,
        "author": "TOI",
        "time": parseInt(Date.parse(item.pubDate._text)) || 0,
        "url": item.link._text,
        "topic": topic
    })
}


// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
const CORS_PROXY = ""

const getTopic = async (topic) => {
    let resp
    try {
        resp = await fetch(CORS_PROXY + TOPIC_PROVIDERS[topic])
    }
    catch (err) {
        console.log(err)
        return;
    }
    let xml = await resp.text();
    // try {
    //     xml = cleaner.parseFromString(xml, "text/xml");
    // }
    // catch (err) {}
    // console.log(xml)
    let json = await JSON.parse(convertXML.xml2json(xml, {compact: true, spaces: 0}));
    
    list = json.rss.channel.item;

    if (Array.isArray(list)) {
        let topicFeed = list.map((item) => {
            return scrapeData(item, topic)
        })
    
        await Feeditem.deleteMany({ topic })
        await Feeditem.insertMany(topicFeed)
        console.log("added", list.length)
        return topicFeed

    }

    return null
}

const updateFeed = async () => {
    await Feeditem.deleteMany({})
    for (t in TOPIC_PROVIDERS) {
        console.log(t)
        let w = await getTopic(t)
    }
}

module.exports = updateFeed