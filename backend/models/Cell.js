const mongoose = require('mongoose')

const cellSchema = new mongoose.Schema({
    name: String,
    generation: Number,
    shape: String,

    color: {
        name: String
    },
    
    size: Number,

    finish: {
        name: String,
        variant: String
    },

    modifiers: [String],

    history: [String],

    createdAt: {
        type: Date
    }
})

module.exports = mongoose.model('Cell', cellSchema)
