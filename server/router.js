const router = require('express').Router();
const picController = require('./controllers/pics.ctrl');
const allergyController = require('./controllers/allergy.ctrl');



router.post('/pic', picController.getFromClarify);

router.post('/allergy', allergyController.postAllergy);
router.post('/allergies', allergyController.postMany);
router.get('/allergy', allergyController.getAll);
router.delete('/allergy/:id', allergyController.deleteAllergy);

module.exports = router;

