const asyncHandler = require('express-async-handler')
const Listing = require('../models/listingModel')

// @desc Get all listings
// @route GET /api/listings
// @access Public
const getListings = asyncHandler(async (req, res) => {
    let listings = await Listing.find()
    res.status(200).json(listings)
})

// @desc Get single listing
// @route GET /api/listings/:id
// @access Public
const getListing = asyncHandler(async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id)
        if (!listing) {
            res.status(404)
            throw new Error('Listing not found')
        }
        res.status(200).json(listing)
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Listing ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Delete single listing
// @route DELETE /api/listings/:id
// @access Public
const deleteListing = asyncHandler(async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id)
        if (!listing) {
            res.status(404)
            throw new Error('Listing not found')
        }

        await listing.deleteOne()

        res.status(200).json({ success: true, deletedID: req.params.id })
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Listing ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Update single listing
// @route PUT /api/listings/:id
// @access Public
const updateListing = asyncHandler(async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id)
        if (!listing) {
            res.status(404)
            throw new Error('Listing not found')
        }
        console.log('old listing', listing)
        let updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        console.log('newListing', updatedListing)

        res.status(200).json(updatedListing)
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Listing ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Create Listing
// @route POST /api/listings
// @access Public
const createListing = asyncHandler(async (req, res) => {
    try {
        let {
        title,
        user,
        companyID,
        datePosted,
        skills,
        pay,
        payBasis,
        type,
        scheduleDays,
        scheduleTime,
        RemoteStatus,
        education,
        descriptions,
        duration,
        directLink,
        isApplied,
        isClosed,
        closingDate,
        dateApplied,
        reasonNotApplied,
        response,
        notes,
        responseDate,
    } = req.body

    let listing = await Listing.create({
        title,
        user,
        companyID,
        datePosted,
        skills,
        pay,
        payBasis,
        type,
        scheduleDays,
        scheduleTime,
        RemoteStatus,
        education,
        descriptions,
        duration,
        directLink,
        isApplied,
        isClosed,
        closingDate,
        dateApplied,
        reasonNotApplied,
        response,
        notes,
        responseDate,
    })
    res.status(201).json(listing)
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    getListings,
    createListing,
    getListing,
    deleteListing,
    updateListing,
}
