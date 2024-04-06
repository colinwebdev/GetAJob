const asyncHandler = require('express-async-handler')
const Listing = require('../models/listingModel')
const Skill = require('../models/skillModel')

function getWeekStart() {
    let todayDate = new Date()
    let today = todayDate.setHours(0, 0, 0, 0)
    let wkDay = todayDate.getDay()
    let subtract = today - wkDay * 24 * 60 * 60 * 1000
    return new Date(subtract)
}

function getWeekEnd() {
    let todayDate = new Date()
    let today = todayDate.setHours(0, 0, 0, 0)
    let wkDay = todayDate.getDay()
    let addTime = today + (7 - wkDay) * 24 * 60 * 60 * 1000
    return new Date(addTime)
}

function getSevenDays() {
    let todayDate = new Date()
    let today = todayDate.setHours(0, 0, 0, 0)
    let wkDay = todayDate.getDay()
    let addTime = today + 7 * 24 * 60 * 60 * 1000
    return new Date(addTime)
}

// @desc Get all listings
// @route GET /api/listings
// @access Public
const getListings = asyncHandler(async (req, res) => {
    let listings = await Listing.find({ isArchived: false })
        .populate('companyID')
        .populate('skills')
    res.status(200).json(listings)
})

// @desc Get single listing
// @route GET /api/listings/search/:field/:text
// @access Public
const searchListings = asyncHandler(async (req, res) => {
    let field = req.params.field
    let text = ''

    switch (field) {
        case 'companyID':
        case 'user':
            text = req.params.text
            break
        default:
            text = { $regex: new RegExp(req.params.text, 'i') }
            break
    }

    try {
        let listings = await Listing.find({
            [field]: text,
        }).populate('companyID')

        res.status(200).json(listings)
    } catch (error) {
        console.log(error)
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Listing ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Filter listings
// @route GET /api/listings/filter/:type
// @access Public
const filterListings = asyncHandler(async (req, res) => {
    try {
        let type = req.params.type
        let wkStart = getWeekStart()

        let listings
        switch (type) {
            case 'appliedWeek':
                listings = await Listing.find({
                    isApplied: true,
                    dateApplied: { $gte: wkStart },
                })
                    .populate('companyID')
                    .populate('skills')
                    .sort({ appliedDate: 1 })
                break
            case 'applied':
                listings = await Listing.find({ isApplied: true })
                    .populate('companyID')
                    .populate('skills')
                    .sort({
                        appliedDate: 1,
                    })
                break
            case 'pending':
                listings = await Listing.find({
                    isApplied: true,
                    response: null,
                    isArchived: false,
                })
                    .populate('companyID')
                    .populate('skills')
                break
            case 'review':
                listings = await Listing.find({
                    isApplied: false,
                    isClosed: false,
                    isArchived: false,
                })
                    .populate('companyID')
                    .populate('skills')
                break
            case 'open':
                listings = await Listing.find({
                    isClosed: false,
                    isArchived: false,
                })
                    .populate('companyID')
                    .populate('skills')
                break
            case 'archived':
                listings = await Listing.find({
                    isArchived: true,
                })
                    .populate('companyID')
                    .populate('skills')
                break
            case 'closed': {
                listings = await Listing.find({
                    isClosed: true,
                })
                    .populate('companyID')
                    .populate('skills')
                break
            }
            case 'all':
                listings = await Listing.find({})
                    .populate('companyID')
                    .populate('skills')
                break

            default:
                break
        }
        console.log(type)
        res.status(200).json(listings)
    } catch (error) {
        console.log(error)
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Listing ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Filter listings to a skill
// @route GET /api/listings/withSkill/:skillId
// @access Public
const skillListings = asyncHandler(async (req, res) => {
    try {
        let skillId = req.params.skillId

        let listings = await Listing.find({
            skills: skillId,
        })

        res.status(200).json(listings)
    } catch (error) {
        console.log(error)
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error(error)
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Get single listing
// @route GET /api/listings/:id
// @access Public
const getListing = asyncHandler(async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id)
            .populate('companyID')
            .populate('skills')

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

// @desc Get dashboard Info
// @route GET /api/listings/dash
// @access Public
const getDashboard = asyncHandler(async (req, res) => {
    try {
        let wkStart = getWeekStart()
        let wkEnd = getSevenDays()

        let appliedWeek = await Listing.find({
            isApplied: true,
            dateApplied: { $gte: wkStart },
        }).count()
        let appliedTotal = await Listing.find({ isApplied: true }).count()
        let pending = await Listing.find({
            isApplied: true,
            response: null,
        }).count()
        let review = await Listing.find({
            isApplied: false,
            isClosed: false,
            isArchived: false,
        }).count()
        let open = await Listing.find({ isClosed: false })
            .sort({ createdAt: -1 })
            .limit(10)
        let applied = await Listing.find({ isApplied: true })
            .sort({ dateApplied: 1 })
            .limit(10)
        let today = new Date()
        let closing = await Listing.find({
            closingDate: {
                $gte: today.setHours(0, 0, 0, 0),
                $lt: wkEnd,
            },
        }).limit(10)
        let allSkills = await Skill.find()
        let skills = []
        for (let skill of allSkills) {
            let hasSkill = await Listing.find({ skills: skill._id }).count()
            skills.push({
                title: skill.name,
                id: skill._id,
                count: hasSkill,
            })
        }
        skills.sort((a, b) => b.count - a.count)
        let keepSkills = skills > 10 ? skills.slice(0, 10) : skills

        let dashData = {
            appliedWeek: appliedWeek,
            appliedTotal: appliedTotal,
            pending: pending,
            review: review,
            closingList: closing,
            openList: open,
            appliedList: applied,
            skills: skills,
        }
        res.status(200).json(dashData)
    } catch (error) {
        console.log(error)
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error("Couldn't get data")
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
        let updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json(updatedListing)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Could not save listing')
    }
})

// @desc Create Listing
// @route POST /api/listings
// @access Public
const createListing = asyncHandler(async (req, res) => {
    try {
        let {
            title,
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
            source,
            sourceLink,
            isApplied,
            isClosed,
            closingDate,
            dateApplied,
            reasonNotApplied,
            response,
            notes,
            responseDate,
        } = req.body

        let notesObj = {}
        if (notes) 
            notesObj = {
                [Date.now()]: notes,
            }

        let listing = await Listing.create({
            title,
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
            source,
            sourceLink,
            isApplied,
            isClosed,
            closingDate,
            dateApplied,
            reasonNotApplied,
            response,
            notes: notesObj,
            responseDate,
        })
        res.status(201).json(listing)
    } catch (error) {
        console.log('controller')
        console.log(error)
        res.status(400)
        throw new Error('Could not create listing')
    }
})

module.exports = {
    getListings,
    createListing,
    getListing,
    deleteListing,
    updateListing,
    searchListings,
    getDashboard,
    filterListings,
    skillListings,
}
