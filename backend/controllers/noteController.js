const asyncHandler = require('express-async-handler')
const Note = require('../models/notesModel')

// @desc Get all notes
// @route GET /api/notes
// @access Public
const getNotes = asyncHandler(async (req, res) => {
    let limit = req.params.limit ? req.params.limit : 0
    let notes = await Note.find()
    // .sort('name').limit(limit)
    res.status(200).json(notes)
})

// @desc Get single note
// @route GET /api/notes/:id
// @access Public
const getNote = asyncHandler(async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            res.status(404)
            throw new Error('Note not found')
        }
        res.status(200).json(note)
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Note ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})


// @desc Delete single note
// @route DELETE /api/notes/:id
// @access Public
const deleteNote = asyncHandler(async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            res.status(404)
            throw new Error('Note not found')
        }

        await note.deleteOne()

        res.status(200).json({ success: true, deletedID: req.params.id })
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Note ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Update single note
// @route PUT /api/notes/:id
// @access Public
const updateNote = asyncHandler(async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            res.status(404)
            throw new Error('Note not found')
        }

        let updatedListing = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json(updatedListing)
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404)
            throw new Error('Note ID not found')
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Create note
// @route POST /api/notes
// @access Public
const createNote = asyncHandler(async (req, res) => {
    let { body } = req.body

    let note = await Note.create({
        body,
    })
    res.status(201).json(note)
})

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    getNote
}
