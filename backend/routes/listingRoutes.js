const express = require('express')
const router = express.Router()
const {
    getListings,
    createListing,
    getListing,
    deleteListing,
    updateListing,
    searchListings,
} = require('../controllers/listingController')

const { protect } = require('../middleware/authMiddleware')

router.get('/', getListings)
router.post('/', createListing)

router.route('/search/:field/:text').get(protect, searchListings)

router
    .route('/:id')
    .get(protect, getListing)
    .delete(protect, deleteListing)
    .put(protect, updateListing)

module.exports = router
