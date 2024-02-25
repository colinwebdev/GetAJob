const express = require('express')
const router = express.Router()
const {
    getCompanies,
    createCompany,
    getCompany,
    deleteCompany,
    updateCompany,
    searchCompanies
} = require('../controllers/companyController')

const { protect } = require('../middleware/authMiddleware')

router
    .route('/')
    .get(protect, getCompanies)
    .post(protect, createCompany)


router
    .route('/search/:text')
    .get(protect, searchCompanies)

router
    .route('/:id')
    .get(protect, getCompany)
    .delete(protect, deleteCompany)
    .put(protect, updateCompany)


module.exports = router
