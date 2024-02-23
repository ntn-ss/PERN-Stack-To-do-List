module.exports = (pool) => {

    const verify = (array) => {
        return array.rows.length == 0
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
                res.json('No to-dos created yet.');
            } else {
                res.json(allTodos.rows);
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    
    // get a to-do
    const getTodo = async (req, res) => {
        try {
            const { id } = req.params;
            const thisTodo = await pool.query(
                "SELECT * FROM todo WHERE todo_id = $1",
                [id]
            );
            
            if (verify(thisTodo)) {
                res.json('This to-do does not exist.')
            } else {
                res.json(thisTodo.rows[0]);
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

    return { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo }
}