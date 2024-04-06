const express = require('express')
const router = express.Router()
const {
    getNotes,
    createNote,
    deleteNote,
    getNote,
    updateNote
} = require('../controllers/noteController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(getNotes)
    .post(createNote)

router
    .route('/:id')
    .get(getNote)
    .delete(deleteNote)
    .put(updateNote)

module.exports = router
