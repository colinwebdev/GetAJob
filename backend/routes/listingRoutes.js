const express = require('express')
const router = express.Router()
const {
    getListings,
    createListing,
    getListing,
    deleteListing,
    updateListing
} = require('../controllers/listingController')

// const { protect } = require('../middleware/authMiddleware')

router.get('/', getListings)
router.post('/', createListing)
// router.get('/:id', getListing)
router
    .route('/:id')
    .get(getListing)
    .delete(deleteListing)
    .put(updateListing)

module.exports = router
