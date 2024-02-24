module.exports = (pool) => {

    const verify = (array) => {
        return array.rows && array.rowCount > 0;
    }

    // create a to-do
    const createTodo = async (req, res) => {
        try {
            const { description } = req.body;
            const newTodo = await pool.query(
                "INSERT INTO todo (description) VALUES ($1) RETURNING *",
                [description]
            );
            
            if (verify(newTodo)) {
                res.json(newTodo.rows[0]);
            } else {
                res.json('To-do was not created.')
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    
    // get all to-dos
    const getAllTodos = async (req, res) => {
        try {
            const allTodos = await pool.query(
                "SELECT * FROM todo"
            );
            
            if (verify(allTodos)) {
                res.json(allTodos.rows);
            } else {
                res.json('No to-dos created yet.');
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    
    // get a to-do
    const getTodo = async (req, res) => {
        try {
            const { id } = req.params;
            const gotTodo = await pool.query(
                "SELECT * FROM todo WHERE todo_id = $1",
                [id]
            );
            
            if (verify(gotTodo)) {
                res.json(gotTodo.rows[0]);
            } else {
                res.json('This to-do does not exist.')
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    
    // update a to-do
    const updateTodo = async (req,res)=>{
        try {
            const { id } = req.params;
            const { description } = req.body;
    
            const updateTodo = await pool.query(
                "UPDATE todo SET description = $1 WHERE todo_id = $2",
                [description, id]
            );
            
            res.json("To-do was updated.");
        } catch (err) {
            console.error(err.message);
        }
    }
    
    // delete a to-do
    const deleteTodo = async(req, res) => {
        try {
            const { id } = req.params;
            
            const deleteTodo = await pool.query(
                "DELETE FROM todo WHERE todo_id = $1",
                [id]
            );
    
            res.json('To-do was deleted.');
        } catch (err) {
            console.error(err.message);
        }
    }

    // delete all to-dos
    const deleteAllTodos = async(req, res) => {
        try {
            const deletedTodos = await pool.query("DELETE FROM todo");

            if (deletedTodos.rowCount > 0) {
                res.json("All to-dos deleted successfully.")
            } else {
                res.json("No to-dos found to delete.")
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo, deleteAllTodos }
}