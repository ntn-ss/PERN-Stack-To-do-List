// components
import Api from "../services/Api"
import EditTodo from "./EditTodo"

// hooks
import { useEffect, useState } from "react"

const ListTodos = () => {
    const [allTodos, setAllTodos] = useState([])
    
    const getTodos = async () => {
        try {
            const res = await Api.get('/')
            setAllTodos(res.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    const verifyTodosExistence = () => {
        return Array.isArray(allTodos) && allTodos.length > 0;
    }

    const handleDelete = async (id) => {
        if (!verifyTodosExistence()) {
            alert("There are no to-dos left.");
            return;
        }

        try {
            if (!id) {
                console.log('porra')
                await Api.delete('/')
                setAllTodos([])
            } else {
                await Api.delete(`/${id}`)
                setAllTodos(allTodos.filter(todo => todo.todo_id !== id))
            }

            getTodos()
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mt-5">
                <h2 className="text-center mb-0">Your to-dos</h2> 
                <button className="btn btn-outline-danger" onClick={()=>handleDelete()}>Delete all to-dos</button>
            </div>
            <table className="table mt-3 text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {verifyTodosExistence() ? (
                        allTodos.map(todo => (
                            <tr key={todo.todo_id}>
                                <td className="align-middle">{todo.todo_id}</td>
                                <td className="align-middle">{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo} update={getTodos} />
                                    <button className='btn btn-danger' onClick={() => handleDelete(todo.todo_id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No to-dos found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default ListTodos
