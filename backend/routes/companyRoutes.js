const express = require('express')
const router = express.Router()
const {
    getCompanies,
    createCompany,
    getCompany,
    deleteCompany,
    updateCompany
} = require('../controllers/companyController')

// const { protect } = require('../middleware/authMiddleware')

router.get('/', getCompanies)
router.post('/', createCompany)

router
    .route('/:id')
    .get(getCompany)
    .delete(deleteCompany)
    .put(updateCompany)

module.exports = router
