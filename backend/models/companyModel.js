const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    address: {
        type: String,
    },
    commuteTime: {
        type: Number,
    },
    isValid: {
        type: Boolean,
        default: true,
    },
    reasonNotValid: {
        type: String,
    },
    logoUrl: {
        type: String,
    },
    notes: [String],
    size: {
        type: String,
    },
    socials: {
        type: Map,
        of: String
    },
    industry: {
        type: String,
    },
})

module.exports = mongoose.model('Company', companySchema)


// use .set on map