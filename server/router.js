const router = require('express').Router();
const picController = require('./controllers/pics.cntrl');
const allergyController = require('./controllers/allergy.ctrl');



router.post('/pic', picController.getFromClarify);

router.post('/allergy', allergyController.postAllergy);

module.exports = router;
