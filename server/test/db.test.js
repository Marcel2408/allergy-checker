const db = require('../models');
const app = require('../index');

const mockAllergy =  {
  allergy: {
    type: 'Asparagus',
    allowNull: false
  }
};

const mockAllergies = [
  {
    type: 'Bacon',
    allowNull: false
  },
  {
    type: 'Egg',
    allowNull: false
  },
  {
    type: 'Potato',
    allowNull: false
  },
  {
    type: 'Milk',
    allowNull: false
  }
];


beforeAll(async() => {
  await db.sequelize.sync({ force: true });
  await db.allergies.createBulk(mockAllergies);
});

// afterEach(async() => {
//   await db.sequelize.drop();
//   await db.sequelize.close();
// });

describe('Database and model test', () => {
  test('Get a list of allergies from the db', async () => {
    const allergies = await db.allergies.findAll();
    console.log(allergies);
  });
});