const db = require('../models');
const request = require('supertest')
const app = require('../app');


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

describe('GET /allergy', () => {
  it('returns an array of allergies', async () =>{
    const res = await request(app).get('/allergy')
    console.log('body',res.body);
    expect(res.body).toBeTruthy();
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(4);
    expect(res.body).toContainEqual({ allergy: 'Egg', id: 2 });
    expect(res.statusCode).toEqual(200);
  });
});

describe('POST /allergy', () => {
  it('should create a new allergy', async () =>{
    const res = await request(app)
      .post('/allergy')
      .send({
        allergy: 'Asparagus'
      });
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty('allergy', 'Asparagus');
    expect(res.statusCode).toEqual(201);
  });
});

describe('POST /allergies', () => {
  it('should post a group of allergies', async () =>{
    const res = await request(app)
      .post('/allergies')
      .send(['apple', 'onion', 'carrot', 'lemon']);
    expect(res.body).toBeTruthy();
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(4);
    expect(res.body).toContainEqual({ allergy: 'apple', id: 6 });
    expect(res.statusCode).toEqual(201);
  });
});

describe('DELETE /allergy/:id', () => {
  it('should delete an allergy item', async () =>{
    const res = await request(app)
      .delete('/allergy/4');
    expect(res.statusCode).toEqual(204);
  });
});



