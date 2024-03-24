const asyncHandler = require('express-async-handler')
const Skill = require('../models/skillModel')
const Listing = require('../models/listingModel')

// @desc Get all skills
// @route GET /api/skills
// @access Public
const getSkills = asyncHandler(async (req, res) => {
    let getSkills = await Skill.find()
    let skills = []
    for (let skill of getSkills) {
        let countSkill = await Listing.find({ skills: skill._id }).count()
        skills.push({
            ...skill._doc,
            count: countSkill,
        })
    }
    res.status(200).json(skills)
})

// @desc Get single skill
// @route GET /api/skills/:id
// @access Public
const getSkill = asyncHandler(async (req, res) => {
    try {
        let skill = await Skill.findById(req.params.id)
        if (!skill) {
            res.status(404)
            throw new Error('Skill not found')
        }
        res.status(200).json(skill)
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Skill ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Search skills
// @route GET /api/skills/search/:field/:text
// @access Private
const searchSkills = asyncHandler(async (req, res) => {
    let limit = req.params.limit ? req.params.limit : 0
    try {
        let skills = await Skill.find({
            [req.params.field]: { $regex: new RegExp(req.params.text, 'i') },
        })
            .sort('name')
            .limit(limit)

        res.status(200).json(skills)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

// @desc Delete single skill
// @route DELETE /api/skills/:id
// @access Public
const deleteSkill = asyncHandler(async (req, res) => {
    try {
        let skill = await Skill.findById(req.params.id)
        if (!skill) {
            res.status(404)
            throw new Error('Skill not found')
        }

        await skill.deleteOne()

        res.status(200).json({ success: true, deletedID: req.params.id })
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Skill ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Update single skill
// @route PUT /api/skills/:id
// @access Public
const updateSkill = asyncHandler(async (req, res) => {
    try {
        let skill = await Skill.findById(req.params.id)
        if (!skill) {
            res.status(404)
            throw new Error('Skill not found')
        }

        let updatedListing = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json(updatedListing)
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Skill ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Create skill
// @route POST /api/skills
// @access Public
const createSkill = asyncHandler(async (req, res) => {
    let { name, have, level } = req.body

    let skill = await Skill.create({
        name,
        have,
        level,
    })
    res.status(201).json(skill)
})

module.exports = {
    getSkills,
    createSkill,
    getSkill,
    deleteSkill,
    updateSkill,
}
