const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

// cria nossa aplicacao
const app = express();

// conecta com o banco de dados cloud
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://omnistack:0ministack@cluster0-bagiw.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// comunicação será feita via JSON
app.use(express.json());

// usa o arquivo de rotas
app.use(routes);

// seleciona a porta da aplicação
// localhost:33333/
app.listen(3333);