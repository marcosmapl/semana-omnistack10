const { Router } = require('express');
const routes = Router();

const DeveloperController = require('./controllers/DeveloperController');
const SearchController = require('./controllers/SearchController');

/*
  Métodos: GET, POST, PUT, DELETE
  Request: requisição
  Response: resposta
  Tipos de parâmetros
    Query Params: request.query (Filtros, ordenação, paginação, ...)
      Ex: www.meusite.com/?user=Marcos
    Route Params: request.params 
      Ex: www.meusite.com/user/1
    Body:
*/
routes.get('/developers', DeveloperController.index);
routes.post('/developers', DeveloperController.store);

routes.get('/search', SearchController.index);

module.exports = routes;