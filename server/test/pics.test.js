const getFromClarify = require('../controllers/pics.cntrl');

jest.mock('../controllers/pics.cntrl', () => {});

const mockUrl = 'http://hello.flowers.com';

describe('Pics controller unit test', () => {
  const req = {};
  const res = {
    send: jest.fn(() => res).mockName('send'),
    sendStatus: jest.fn(() => res).mockName('sendStatus'),
    status: jest.fn(() => res).mockName('status')
  }
  describe('getFromClarify', () => {
    req.body = mockUrl;
    let postToClarify = jest.fn();
    postToClarify.mockResolvedValue('Bananarama');

    test('getFromClarify should return Bananarama', async () => {
      await getFromClarify(req, res);
      expect(postToClarify).toHaveBeenCalled();
    })
  })
})