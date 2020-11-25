const db = require('../models');

let allergies;

const mockAllergy =  {
  allergy: 'Asparagus'
};

const mockAllergies = [
  {
    allergy: 'Bacon'
  },
  {
    allergy: 'Egg'
  },
  {
    allergy: 'Potato'
  },
  {
    allergy: 'Milk'
  }
];


beforeAll(async() => {
  await db.sequelize.sync({ force: true });
  await db.Allergy.bulkCreate(mockAllergies);
});

afterAll(async() => {
    await db.sequelize.drop();
    await db.sequelize.close();
});

describe('Database and model test', () => {
  test('should get a list of allergies from the db', async() => {
    allergies = await db.Allergy.findAll();
    expect(allergies.length).toEqual(4);
  });

  test('should delete an item from the list of allergies', async() => {
    allergies = await db.Allergy.findAll();
    expect(allergies.length).toEqual(4);
    await db.Allergy.destroy({where: {allergy: 'Egg'}});
    allergies = await db.Allergy.findAll();
    expect(allergies.length).toEqual(3);
  });

});