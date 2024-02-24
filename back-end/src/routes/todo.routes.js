module.exports = (express, pool) => {
    const router = express.Router();

    const todoService = require('../services/todo.service')(pool);

    // create a to-do
    router.post('/', todoService.createTodo);

    // get all to-dos
    router.get('/', todoService.getAllTodos);

    // get a to-do
    router.get('/:id', todoService.getTodo);

    // update a to-do
    router.put('/:id', todoService.updateTodo);

    // delete a to-do
    router.delete('/:id', todoService.deleteTodo);

    // delete all to-dos
    router.delete('/', todoService.deleteAllTodos);

    return router;
};