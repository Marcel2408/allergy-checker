const app = require('./app');
const db = require('./models/index');

const PORT = 3000;

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

module.exports = db;





