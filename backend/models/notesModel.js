const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Note', noteSchema)