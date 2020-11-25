const getFromClarify = require('../controllers/pics.ctrl');

describe('Pics controller unit test', () => {
  const mockUrl = 'http://hello.flowers.com';
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

    test('getFromClarify should call postToClarify', async () => {
      await getFromClarify(req, res);
      expect(postToClarify).toHaveBeenCalled();
    })
  })
})