const asyncHandler = require('express-async-handler')
const Company = require('../models/companyModel')

// @desc Get all companies
// @route GET /api/companies
// @access Public
const getCompanies = asyncHandler(async (req, res) => {
    let companies = await Company.find()
    res.status(200).json(companies)
})

// @desc Search companies
// @route GET /api/companies/search/:text
// @access Public
const searchCompanies = asyncHandler(async (req, res) => {
    try {
        let regex = new RegExp(req.params.text, 'i')
        let companies = await Company.find({
            name: { $regex:  regex},
        })

        res.status(200).json(companies)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

// @desc Get single company
// @route GET /api/companies/:id
// @access Public
const getCompany = asyncHandler(async (req, res) => {
    try {
        let company = await Company.findById(req.params.id)
        if (!company) {
            res.status(404)
            throw new Error('Company not found')
        }
        res.status(200).json(company)
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Company ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Delete single company
// @route DELETE /api/companies/:id
// @access Public
const deleteCompany = asyncHandler(async (req, res) => {
    try {
        let company = await Company.findById(req.params.id)
        if (!company) {
            res.status(404)
            throw new Error('Company not found')
        }

        await company.deleteOne()

        res.status(200).json({ success: true, deletedID: req.params.id })
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Company ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Update single company
// @route PUT /api/companies/:id
// @access Public
const updateCompany = asyncHandler(async (req, res) => {
    try {
        let company = await Company.findById(req.params.id)
        if (!company) {
            res.status(404)
            throw new Error('Company not found')
        }
        console.log('old company', company)
        let updatedListing = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        console.log('newListing', updatedListing)

        res.status(200).json(updatedListing)
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Company ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Create company
// @route POST /api/companies
// @access Public
const createCompany = asyncHandler(async (req, res) => {
    let {
        name,
        location,
        address,
        commuteTime,
        isValid,
        reasonNotValid,
        logoUrl,
        notes,
        size,
        socials,
        industry,
    } = req.body

    let company = await Company.create({
        name,
        location,
        address,
        commuteTime,
        isValid,
        reasonNotValid,
        logoUrl,
        notes,
        size,
        socials,
        industry,
    })
    res.status(201).json(company)
})

module.exports = {
    getCompanies,
    createCompany,
    getCompany,
    deleteCompany,
    updateCompany,
    searchCompanies,
}
