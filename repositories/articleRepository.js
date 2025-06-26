const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async ({ title, content, author }) => {
  return await prisma.article.create({
    data: { title, content, author }
  });
};

const findAll = async () => {
  return await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

module.exports = { create, findAll };