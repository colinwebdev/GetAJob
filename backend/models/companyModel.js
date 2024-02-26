const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    commuteTime: {
        type: String,
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
    notes: {
        type: Map,
        of: String
    },
    size: {
        type: String,
    },
    industry: {
        type: String,
    },
})

module.exports = mongoose.model('Company', companySchema)


// use .set on map