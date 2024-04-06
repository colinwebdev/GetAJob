const express = require('express')
const router = express.Router()
const {
    getSkills,
    createSkill,
    getSkill,
    deleteSkill,
    updateSkill
} = require('../controllers/skillController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(getSkills)
    .post(createSkill)

router
    .route('/:id')
    .get(getSkill)
    .delete(deleteSkill)
    .put(updateSkill)

module.exports = router
