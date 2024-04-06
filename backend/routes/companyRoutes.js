const express = require('express')
const router = express.Router()
const {
    getCompanies,
    createCompany,
    getCompany,
    deleteCompany,
    updateCompany,
    searchCompanies,
} = require('../controllers/companyController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getCompanies).post(createCompany)

router.route('/search/:field/:text').get(searchCompanies)

router
    .route('/:id')
    .get(getCompany)
    .delete(deleteCompany)
    .put(updateCompany)

module.exports = router
