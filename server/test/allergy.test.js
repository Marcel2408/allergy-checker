const {Allergy} = require('../models');
// const app = require ('../index')
const {postAllergy, postMany, getAll, deleteAllergy} = require('../controllers/allergy.ctrl');

jest.mock('../models', () =>({ Allergy: () =>{}}));

const mockAllergy = {
  allergy: {
    type: 'Bacon',
    allowNull: false
  }
}

const mockAllergyGroup = [{allergy: 'Bacon'}, {allergy: 'Egg'}, {allergy:'Potatoe'}]

const mockDelete = {
  allergy: {
    id: 1,
    type: 'Bacon'
  }
}

describe('Allergy controller unit test', () => {
  const req = {};
  const res = {
    send: jest.fn(() => res).mockName('send'),
    status: jest.fn(() => res).mockName('status'),
    sendStatus: jest.fn(() => res).mockName('sendStatus')
  }
  describe('getAll', () => {
    Allergy.findAll = jest.fn()
    Allergy.findAll.mockResolvedValue(mockAllergy)

    test('Allergy.getAll should have been called once', async () => {
      await getAll(req, res);
      expect(Allergy.findAll).toHaveBeenCalled();
    })

    test('should call res.send with allergy and set correct status', async () => {
      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockAllergy);
    })
  })
  describe('postAllergy', () => {
    req.body = {
      type: mockAllergy.type
    }
    Allergy.create = jest.fn();
    Allergy.create.mockResolvedValue(mockAllergy);

    test('Allergy.postAllergy should have been called once', async () => {
      await postAllergy(req, res);
      expect(Allergy.create).toHaveBeenCalled()
    })

    test('Allergy.create should have been called with body', async () => {
      await postAllergy(req, res);
      expect(Allergy.create).toHaveBeenCalledWith(req.body);
    })

    test('should call res.send with new Allergy and set correct status', async () => {
      await postAllergy(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockAllergy);
    })
  })
  describe('postMany', () => {
    req.body = ['Bacon', 'Egg', 'Potatoe'];
  
    Allergy.bulkCreate = jest.fn();
    Allergy.bulkCreate.mockResolvedValue(mockAllergyGroup);

    test('Allergy.postMany should have been called once', async () => {
      await postMany(req, res);
      expect(Allergy.bulkCreate).toHaveBeenCalled();
    })

    test('Allergy.bulkCreate to have been called with body', async () => {
      await postMany(req, res);
      expect(Allergy.bulkCreate).toHaveBeenCalledWith(mockAllergyGroup);
    })

    test('should call res.send with new AllergyGroup and set correct status', async () => {
      await postMany(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockAllergyGroup);
    })
  })
  describe('deleteAllergy', () => {
    req.params = {
      id: mockDelete.id
    }

    Allergy.destroy = jest.fn();
    Allergy.destroy.mockResolvedValue('hello')

    test('Allergy.deleteAllergy should have been called once', async () => {
      await deleteAllergy(req, res);
      expect(Allergy.destroy).toHaveBeenCalled();
    })

    test('Allergy.destroy to have been called with req.params.id', async () => {
      await deleteAllergy(req, res);
      expect(Allergy.destroy).toHaveBeenCalledWith({where: {id: mockDelete.id}});
    })
    test('should call res.sendStatus with the correct status', async () => {
      await deleteAllergy(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    })
  })
})