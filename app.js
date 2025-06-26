const express = require('express');
const app = express();
const articleController = require('./controllers/articleController');

app.use(express.json());

app.get('/articles', articleController.getAll);
app.post('/articles', articleController.create);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API MiniBlog 📝');
});


module.exports = app;