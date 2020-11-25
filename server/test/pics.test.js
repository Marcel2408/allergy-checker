let { getFromClarify }  = require('../controllers/pics.ctrl');
let  { postToClarify } = require('../controllers/utilities.ctrl');

jest.mock('../controllers/utilities.ctrl');

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

    test('should call postToClarify function once', async () => {
      const postSpy = jest.fn();
      postToClarify.mockImplementation(() => postSpy());
      getFromClarify(req, res)
      expect(postSpy).toHaveBeenCalledTimes(1);
    });

    test('should call res.send and set correct status', async () => {
      const postSpy = jest.fn();
      postToClarify.mockImplementation(() => postSpy());
      getFromClarify(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

  });

});