const mongoose = require('mongoose')

const skillSchema = mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    have: {
        type: Boolean,
        default: false
    },
    level: {
        type: String
    }

})

module.exports = mongoose.model('Skill', skillSchema)
