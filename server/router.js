const router = require('express').Router();
const picController = require('./controllers/pics.cntrl');



router.post('/pic', picController.getFromClarify);

module.exports = router;
