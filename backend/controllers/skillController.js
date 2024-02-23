const asyncHandler = require('express-async-handler')
const Skill = require('../models/skillModel')

// @desc Get all skills
// @route GET /api/skills
// @access Public
const getSkills = asyncHandler(async (req, res) => {
    let skills = await Skill.find()
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
        console.log('old skill', skill)
        let updatedListing = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        console.log('newListing', updatedListing)

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
    let {
        name,
        have,
        level
    } = req.body

    let skill = await Skill.create({
        name,
        have,
        level
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
