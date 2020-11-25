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

exports.postMany = async (req, res) => {
  try {
    const allergyGroup = req.body;
    const allergyTypedGroup = allergyGroup.map(allergy => ({allergy: allergy}));
    const postedAllergies = await db.Allergy.bulkCreate(allergyTypedGroup);
    res.status(201);
    res.send(postedAllergies);
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

exports.deleteAllergy = async (req, res) => {
  const id = req.params.id;
  try {
    await db.Allergy.destroy({
      where: { id: id }
    })
    res.sendStatus(204);
  } catch (error) {
    console.log("error at allergy controller", error);
    res.sendStatus(500);
  }
}
