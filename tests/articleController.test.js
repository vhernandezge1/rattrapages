const request = require('supertest');
const app = require('../app');

jest.mock('../services/articleService');
const service = require('../services/articleService');

describe('GET /articles', () => {
  it('devrait retourner une liste vide', async () => {
    service.getAllArticles.mockResolvedValue([]);
    const res = await request(app).get('/articles');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('devrait retourner des articles', async () => {
    const articles = [
      { id: 1, title: 'Titre 1', content: 'Contenu', author: 'Valentin', createdAt: new Date().toISOString() }
    ];
    service.getAllArticles.mockResolvedValue(articles);
    const res = await request(app).get('/articles');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('title', 'Titre 1');
  });
});

describe('POST /articles', () => {
  const validArticle = { title: 'Test', content: 'Contenu', author: 'Valentin' };

  it('devrait créer un article', async () => {
    const created = { ...validArticle, id: 1, createdAt: new Date().toISOString() };
    service.createArticle.mockResolvedValue(created);
    const res = await request(app).post('/articles').send(validArticle);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(validArticle);
  });

  it('devrait échouer si un champ est manquant', async () => {
    service.createArticle.mockRejectedValue(new Error('Champ manquant'));
    const res = await request(app).post('/articles').send({ title: 'Test' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Champ manquant');
  });

  it('devrait échouer si un champ est vide', async () => {
    service.createArticle.mockRejectedValue(new Error('Champ vide'));
    const res = await request(app).post('/articles').send({ title: '', content: '', author: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('devrait échouer si le corps est vide', async () => {
    service.createArticle.mockRejectedValue(new Error('Requête vide'));
    const res = await request(app).post('/articles').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('devrait gérer une exception inconnue du service', async () => {
    service.createArticle.mockImplementation(() => {
      throw new Error('Erreur inattendue');
    });
    const res = await request(app).post('/articles').send(validArticle);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Erreur inattendue');
  });
});
