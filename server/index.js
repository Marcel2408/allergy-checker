const express = require('express');
const cors = require('cors');
const router = require('./router');
const PORT = 3000;
const app = express();
const db = require('./models/index');


app.use(cors());
app.use(express.json());
app.use(router);


(async function bootstrap () {
  try {
    await db.sequelize.sync({force: true});
  } catch (error) {
    console.log('error connecting to db', error);
  }
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  })
})();

db.sequelize.authenticate();





