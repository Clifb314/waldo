const mongoose = require('mongoose')
const Schema = mongoose.Schema


const charSchema = new Schema({
    name: {type: String, required: true},
    rangeX: {
        min: {type: Number, required: true},
        max: {type: Number, required: true}
    },
    rangeY: {
        min: {type: Number, required: true},
        max: {type: Number, required: true}
    },
})

const picSchema = new Schema({
    fileName: {type: String, required: true},
    origX: {type: Number, required: true},
    origY: {type: Number, required: true},
    chars: {type: [charSchema], required: true}
})

//Could try making a getter that returns all characters in the photo
picSchema.virtual('answer').get(function() {
    let characters = this.chars
    let x = 0
    const length = character.length - 1
    let output = ''
    while (x < length) {
        output += characters[x].name + ', '
        x++
    }
    output += character[length].name

    return output
})

picSchema.virtual('answerArr').get(function() {
    let characters = this.chars
    let x = 0
    const length = characters.length
    let output = []
    while (x < length) {
        output.push(characters[x].name)
        x++
    }
    return output
})

module.exports = mongoose.model('picModel', picSchema)