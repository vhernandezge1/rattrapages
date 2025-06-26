const request = require('supertest');
const app = require('../app');

jest.mock('../services/articleService');
const service = require('../services/articleService');

describe('Article Controller', () => {
  it('GET /articles should return 200', async () => {
    service.getAllArticles.mockResolvedValue([]);
    const res = await request(app).get('/articles');
    expect(res.statusCode).toBe(200);
  });

  it('POST /articles should return 201', async () => {
    const newArticle = { id: 1, title: 'Hello' };
    service.createArticle.mockResolvedValue(newArticle);
    const res = await request(app).post('/articles').send({ title: 'Hello' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Hello');
  });
});