const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScoreSchema = new Schema({
    name: {type: String, default: 'anonymous', trim: true, minLength: 3, maxLength: 12},
    score: {type: Number, required: true, min: 1},
    date: {type: Date, default: new Date()}
})

ScoreSchema.virtual('easyDate').get(function() {
    return this.date.toLocaleDateString()
})

module.exports = mongoose.model('scoreModel', ScoreSchema)