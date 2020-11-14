const express = require('express');
const cors = require('cors');
const router = require('./router');
const PORT = 3000;
const app = express();
const morgan = require('morgan');


app.use(cors());
app.use(express.json());
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(router);


app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})


/*
POST --> '/pic' = ingredients from Clarifai DONE

POST --> '/allergies' => store alergies to db
GET --> '/allergies' => get allergies from db
DELETE --> '/allergies' => delete allergy from db
*/
