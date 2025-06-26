const repo = require('../repositories/articleRepository');

const createArticle = async (data) => {
  if (!data.title || data.title.trim() === '') {
    throw new Error('Title is required');
  }
  return await repo.create(data);
};

const getAllArticles = async () => await repo.findAll();

module.exports = { createArticle, getAllArticles };