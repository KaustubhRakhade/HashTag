const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const subscriptionSchema = new Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })

subscriptionSchema.statics.addSubscription = async function (email) {

    if (!email) {
        throw Error("Email address cannot be empty!")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email address is not valid!")
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("You are already subscribed!")
    }

    const subscription = await this.create({ email })
    return subscription
}

module.exports = mongoose.model("Subscription", subscriptionSchema)