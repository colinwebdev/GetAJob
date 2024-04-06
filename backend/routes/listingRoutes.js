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

router.get('/', getListings)
router.post('/', createListing)

router.route('/search/:field/:text').get(searchListings)

router.route('/filter/:type').get(filterListings)

router.route('/withSkill/:skillId').get(skillListings)

router.route('/dash').get(getDashboard)

router
    .route('/:id')
    .get(getListing)
    .delete(deleteListing)
    .put(updateListing)

module.exports = router
