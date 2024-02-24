const express = require('express')
const router = express.Router()
const {
    getSkills,
    createSkill,
    getSkill,
    deleteSkill,
    updateSkill
} = require('../controllers/skillController')

const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getSkills)
    .post(protect, createSkill)

router
    .route('/:id')
    .get(protect, getSkill)
    .delete(protect, deleteSkill)
    .put(protect, updateSkill)

module.exports = router
