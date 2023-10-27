var express = require('express');
var router = express.Router();
const picControl = require('../controllers/picController')

/* routes for game functions */
router.get('/list', picControl.picList)
router.get('/list/:id', picControl.randomPic);
router.get('/hints', picControl.easyOn)
router.post('/answer', picControl.checkAnswer)
router.post('/end-game', picControl.endGame)
router.get('/scoreboard', picControl.popScore)


module.exports = router;
