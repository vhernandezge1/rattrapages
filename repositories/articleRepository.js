let articles = [];
let idCounter = 1;

const create = async ({ title, content, author }) => {
  const article = { id: idCounter++, title, content, author, createdAt: new Date() };
  articles.push(article);
  return article;
};

const findAll = async () => articles;

module.exports = { create, findAll };