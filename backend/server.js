require("dotenv").config()
const cors = require('cors')

const express = require("express")
const mongoose = require("mongoose")
const subscribeRoutes = require('./routes/subscribe')
const feedRoutes = require('./routes/feed')
const searchRoutes = require('./routes/search')
const updateFeed = require('./scraper')

const app = express()
app.use(express.json())
app.use(cors());
app.use("/api/subscribe", subscribeRoutes)
app.use("/api/feed", feedRoutes)
app.use("/api/search", searchRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
        updateFeed()
        setInterval(updateFeed, 900000) //update every 15 minutes
    })
    .catch((error) => {
        console.log(error)
    })