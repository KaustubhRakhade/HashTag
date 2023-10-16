const express = require("express")
const Feeditem = require("../models/feeditem")

const router = express.Router()

router.get('/:q', async (req, resp) => {
    const { q } = req.params

    const feed = await Feeditem.find({ $or: [
        {title: { $regex: ".(?i:" + q + ")." }},
        {content: { $regex: ".(?i:" + q + ")." }},
    ]})

    if (!feed) {
        resp.status(404).json({
            error: "Feed empty!"
        })
        return
    }

    resp.status(200).json(feed)
})

module.exports = router