const router = require('express').Router();
const picController = require('./controllers/pics.cntrl');
const allergyController = require('./controllers/allergy.ctrl');



router.post('/pic', picController.getFromClarify);

router.post('/allergy', allergyController.postAllergy);
router.get('/allergy', allergyController.getAll);

module.exports = router;

/*
POST --> '/pic' = ingredients from Clarifai DONE

POST --> '/allergies' => store alergies to db DONE
GET --> '/allergies' => get allergies from db
DELETE --> '/allergies' => delete allergy from db
*/
