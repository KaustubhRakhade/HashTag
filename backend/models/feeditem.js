const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feeditemSchema = new Schema({
    title: { type: String },
    content: { type: String },
    image: { type: String },
    author: { type: String },
    time: { type: Number },
    url: { type: String },
    topic: { type: String }
}, {timestamps: true})

module.exports = mongoose.model("Feeditem", feeditemSchema)