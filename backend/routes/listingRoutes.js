const express = require('express')
const router = express.Router()
const {
    getListings,
    createListing,
    getListing,
    deleteListing,
    updateListing,
    searchListings,
    getDashboard,
    filterListings,
    skillListings
} = require('../controllers/listingController')

const { protect } = require('../middleware/authMiddleware')

router.get('/', getListings)
router.post('/', createListing)

router.route('/search/:field/:text').get(protect, searchListings)

router.route('/filter/:type').get(protect, filterListings)

router.route('/withSkill/:skillId').get(protect, skillListings)

router.route('/dash').get(protect, getDashboard)

router
    .route('/:id')
    .get(protect, getListing)
    .delete(protect, deleteListing)
    .put(protect, updateListing)

module.exports = router
