const Pics = require('../models/picModel')
const Scores = require('../models/scoreModel')
//const {body, validationResult} = require('express-validator')

// function importAll(r) {
//     return r.keys().map(r);
//   }
  
// const images = importAll(require.context('../images/', false, /\.(png|jpe?g|svg)$/));
// const imgLen = images.length - 1

//it'll be easier to randomize on client side so let's serve the picture list first
//just name and _id
exports.picList = async function(req, res, next) {
    const images = await Pics.find({}, {fileName: 1}).exec()
    if (images.length < 1) res.json({err: 'Database appears empty'})
    else res.json({images})
}

//no longer random. Will return a specific image
exports.randomPic = async function(req, res, next) {
    const id = req.params.id
    const image = await Pics.findById(id)
    if (!image) res.json({err: 'Image not found'})

    //const choice = images[Math.floor(Math.random() * (images.length - 1))]
    const path = path.join(__dirname, 'images', image.fileName)

    //will change this to sending a json w/ src: , name: ?
    res.sendFile(path, {}, function(err) {
        if (err) next(err)
        else console.log(`Sent: ${choice.fileName}`)
    })

}

exports.easyOn = async function(req, res, next) {
    const request = req.body.json()
    const image = await Pics.findById(request.id)
    if (!image) res.status(500).json({err: 'Image not found'})

    //return all characters in the selected picture
    const output = [...image.answerArr]

    return res.json({options: output})
}

exports.checkAnswer = async function(req, res, next) {

        const guess = req.body.json()

        const target = await Pics.findById(guess.id).exec()

        if (!target) res.json({err: 'Image not linked to database'})

        const checkName = target.chars.filter(obj => obj.name === guess.name)
        const name = checkName.pop()
        if (!name) res.json({result: 0, hint: 'This character is not in this image!'})

        if (name.rangeX.min > guess.x) res.json({result: 0, hint: 'Not there, bit higher...'})
        else if (name.rangeX.max < guess.x) res.json({result: 0, hint: 'Not there, bit lower...'})
        else if (name.rangeY.min > guess.y) res.json({result: 0, hint: 'Not there, bit to the right...'})
        else if (name.rangeY.max < guess.y) res.json({result: 0, hint: 'Not there, bit to the left...'})
        else res.json({result: 1, msg: 'You got it!'})
    }

    exports.endGame = async function(req, res, next) {
        const {score, name} = req.body.json()
        //const notUnique = await Scores.findOne({name}).exec()
        //if (notUnique) return res.status(400).json({})
        const upload = new Scores({
            name,
            score,
        })
        await upload.save().catch(err => res.status(400).json({err, msg: 'Error inserting into database'}))

        res.status(200).json({msg: 'Success!'})
    }

    exports.popScore = async function(req, res, next) {
        const output = await Scores.find({}).sort({score: -1}).limit(10).lean()

        if (output.length < 1) res.status(500).json({msg: 'Database appears empty'})

        res.json({scores: output})
    }