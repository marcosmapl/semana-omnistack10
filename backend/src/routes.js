const { Router } = require('express');
const routes = Router();

// imports controller for developers 
const DeveloperController = require('./controllers/DeveloperController');

// import controller of searchs
const SearchController = require('./controllers/SearchController');

/*
  REST Methods: GET, POST, PUT, DELETE
  Type of param
    Query Params: request.query (filtering, sort, page index, ...)
      Ex: www.meusite.com/?user=Marcos
    Route Params: request.params 
      Ex: www.meusite.com/user/1
*/

// bind route GET '/developers' to controller 'index' (list all) function
routes.get('/developers', DeveloperController.index);

// bind route POST '/developers' to controller 'store' (add new) function
routes.post('/developers', DeveloperController.store);

// bind route GET '/search' to controller 'index' (list all) function
routes.get('/search', SearchController.index);

module.exports = routes;