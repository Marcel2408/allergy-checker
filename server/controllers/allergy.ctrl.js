const db = require('../models');

exports.postAllergy = async (req, res) => {
  const allergy = req.body;
  try {
    const postedAllergy = await db.Allergy.create(allergy)
    res.status(201);
    res.send(postedAllergy);
  } catch (error) {
    console.log("error at allergy controller", error);
    res.sendStatus(500);
  }
}

exports.getAll = async (req, res) => {
  try {
    const allergies = await db.Allergy.findAll();
    res.status(200);
    res.send(allergies);
  } catch (error) {
    console.log("error at allergy controller", error);
    res.sendStatus(500);
  }
}
