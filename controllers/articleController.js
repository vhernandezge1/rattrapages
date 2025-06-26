const service = require('../services/articleService');

const getAll = async (req, res) => {
  const articles = await service.getAllArticles();
  res.status(200).json(articles);
};

const create = async (req, res) => {
  try {
    const article = await service.createArticle(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAll, create };