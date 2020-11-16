const router = require('express').Router();
const picController = require('./controllers/pics.cntrl');
const allergyController = require('./controllers/allergy.ctrl');



router.post('/pic', picController.getFromClarify);

router.post('/allergy', allergyController.postAllergy);
router.post('/allergies', allergyController.postMany);
router.get('/allergy', allergyController.getAll);
router.delete('/allergy/:id', allergyController.deleteAllergy);

module.exports = router;

/*
POST --> '/pic' = ingredients from Clarifai DONE

POST --> '/allergies' => store alergies to db DONE
GET --> '/allergies' => get allergies from db DONE
DELETE --> '/allergies' => delete allergy from db DONE
*/
