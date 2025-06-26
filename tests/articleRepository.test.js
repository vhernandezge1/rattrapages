const repo = require('../repositories/articleRepository');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.article.deleteMany();
});

describe('Article Repository with Prisma', () => {
  it('should add article to the database', async () => {
    const article = await repo.create({
      title: 'Repo Article',
      content: 'Contenu du test',
      author: 'Testeur'
    });
    expect(article.id).toBeDefined();

    const all = await repo.findAll();
    expect(all.length).toBe(1);
    expect(all[0].title).toBe('Repo Article');
  });
});