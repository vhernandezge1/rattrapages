class Article {
  constructor({ id, title, content, author, createdAt }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = Article;