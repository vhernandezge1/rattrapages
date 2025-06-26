const repo = require('../repositories/articleRepository');

describe('Article Repository', () => {
  it('should add article to the list', async () => {
    const article = await repo.create({ title: 'Repo Article' });
    expect(article.id).toBeDefined();
  });
});