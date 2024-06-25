const express = require('express');


const todosRouter = require('./todos.router.js');

function routerTodos(app) {
    const router = express.Router();
    app.use('/', router);
    router.use('/todospanel', todosRouter);


}

module.exports = routerTodos;
