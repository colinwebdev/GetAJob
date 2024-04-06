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
            type: String,
        },
        payBasis: {
            type: String,
        },
        type: {
            type: String,
        },
        schedule: {
            type: String,
        },
        remoteStatus: {
            type: String,
        },
        education: {
            type: String,
        },
        description: {
            type: String,
        },
        benefits: {
            type: String,
        },
        qualifications: {
            type: String,
        },
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
        response: {
            type: String,
        },
        notes: {
            type: Map,
            of: String,
        },
        responseDate: {
            type: Date,
        },
        source: {
            type: String
        },
        sourceLink: {
            type: String
        },
        isArchived: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Listing', listingSchema)
