const mongoose = require('mongoose')

const listingSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        companyID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Company',
        },
        datePosted: {
            type: Date,
        },
        skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
        seniority: {
            type: String,
        },
        pay: {
            type: Number,
        },
        payBasis: {
            type: String,
        },
        type: {
            type: String,
        },
        scheduleDays: {
            type: String,
        },
        scheduleTime: {
            type: String,
        },
        remoteStatus: {
            type: String,
        },
        education: {
            type: String,
        },
        description: [String],
        benefits: [String],
        requirements: [String],
        duration: {
            type: String,
        },
        directLink: {
            type: String,
        },
        isApplied: {
            type: Boolean,
            default: false,
        },
        isClosed: {
            type: Boolean,
            default: false,
        },
        closingDate: {
            type: Date,
        },
        dateApplied: {
            type: Date,
        },
        reasonNotApplied: {
            type: String,
        },
        response: [String],
        notes: [String],
        responseDate: {
            type: Date,
        },
        sources: {
        type: Map,
        of: String
    },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Listing', listingSchema)
