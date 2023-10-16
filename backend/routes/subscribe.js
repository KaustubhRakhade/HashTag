const express = require("express")
const Subscription = require('../models/subscription')

const router = express.Router()

router.post('/', async (req, resp) => {
    const { email } = req.body

    try {
        const subscription = await Subscription.addSubscription(email)
        resp.status(200).json(subscription)
    }
    catch (err) {
        resp.status(400).json({error: err.message})
    }

})

module.exports = router