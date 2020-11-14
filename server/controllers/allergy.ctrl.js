exports.postAllergy = async (req, res) => {
  try {

    res.status(200);
    res.send({nice: 'worked'});
  } catch (error) {
    console.log("error at allergy controller", error);
    res.sendStatus(500);
  }
}
