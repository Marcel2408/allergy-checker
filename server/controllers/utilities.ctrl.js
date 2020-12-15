const { ClarifaiStub } = require("clarifai-nodejs-grpc");
const grpc = require("@grpc/grpc-js");

const { FOOD_MODEL_ID, API_KEY } = require("../config");

const metadata = new grpc.Metadata();
metadata.set("authorization", API_KEY);

const stub = ClarifaiStub.grpc();

exports.postToClarify = async (imageUrl, res) => {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
       model_id: FOOD_MODEL_ID,
       inputs: [{data: {image: {url: imageUrl}}}]
      },
      metadata,
      (err, response) => {
      if (response.status.code !== 10000) {
        console.log(response.status);
        console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
        return;
      }
      if (err) {
        console.log("Error: " + err);
        reject(`Error: ${err}`);
      }
      const ingredients = [];
      for (const c of response.outputs[0].data.concepts) {
       ingredients.push({
          id: c.id,
          name: c.name,
          prob: Math.round(c.value * 100)
       })
      }
      resolve(ingredients);
      }
    );
  })
}
