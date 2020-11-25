const  postToClarify  = require('./utilities.ctrl')

exports.getFromClarify = async (req, res) => {
  try {
    const { url } = req.body;
    const ingredients = await postToClarify(url,res);
    res.status(200);
    res.send(ingredients);
  } catch (error) {
    console.log("error at pic controller", error);
    res.sendStatus(500);
  }
};


