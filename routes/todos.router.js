const express = require('express');
const router = express.Router();
const Todo = require('../src/models/todoModels');
const { col } = require('sequelize');

// Obtener todas las tareas
// Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.render('index', { todos, todo: null, errorMessage: null });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las tareas');
    }
});


// Crear una nueva tarea
router.post('/', async (req, res) => {
    try {
        const { title, completed } = req.body;
        await Todo.create({ title, completed: completed || false }); // completed: false por defecto
        res.redirect('/todospanel'); // Redirigir a la lista de tareas después de crear una nueva tarea
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear una nueva tarea');
    }
});

/// Obtener una tarea por su ID (formulario)
router.post('/search', async (req, res) => {
    try {
        const { taskId } = req.body;
        const todo = await Todo.findByPk(taskId);
        if (!todo) {
            const todos = await Todo.findAll();
            return res.render('index', { todos, todo: null, errorMessage: 'Tarea no encontrada' });
        }
        const todos = await Todo.findAll();
        res.render('index', { todos, todo, errorMessage: null });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar la tarea');
    }
});



// Actualizar una tarea
router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).send('Tarea no encontrada');
        }
        await todo.update({ title, completed: completed || false });
        res.redirect('/todospanel');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la tarea');
    }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).send('Tarea no encontrada');
        }
        await todo.destroy();
        res.redirect('/todospanel');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la tarea');
    }
});

// Buscar una tarea por su ID (formulario)
router.post('/search', async (req, res) => {
    try {
        const { taskId } = req.body;
        const todo = await Todo.findByPk(taskId);
        if (!todo) {
            return res.status(404).send('Tarea no encontrada');
        }
        const todos = await Todo.findAll(); // Obtener todas las tareas (para mostrar la lista)
        res.render('todos/index', { todos, todo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar la tarea');
    }
});

module.exports = router;
