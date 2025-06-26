const service = require('../services/articleService');
const repo = require('../repositories/articleRepository');

jest.mock('../repositories/articleRepository');

describe('Article Service', () => {
  it('should create an article', async () => {
    repo.create.mockResolvedValue({ id: 1, title: 'Test Article' });
    const result = await service.createArticle({ title: 'Test Article' });
    expect(result.title).toBe('Test Article');
  });

  it('should throw error for empty title', async () => {
    await expect(service.createArticle({ title: '' })).rejects.toThrow('Title is required');
  });
});