const express = require("express")
const Feeditem = require("../models/feeditem")
const getTopic = require("../scraper")

const router = express.Router()

router.get('/:topic', async (req, resp) => {
    const { topic } = req.params

    let feed = await Feeditem.find({ topic })

    if (!feed) {
        resp.status(404).json({
            error: "Feed empty!"
        })
        return
    }

    resp.status(200).json(feed)
})

module.exports = router