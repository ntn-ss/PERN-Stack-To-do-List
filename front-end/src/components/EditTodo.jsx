// hooks
import { useEffect, useState } from "react"
import Api from '../services/Api'

const EditTodo = ({ todo , update }) => {
    
    const { todo_id, description } = todo

    const [newDescription, setNewDescription] = useState(description)

    useEffect(() => {
        setNewDescription(description);
    }, [description]);
    
    const resetDesc = () => {
        setNewDescription(description);
    }

    const handleEdit = async () => {
        try {
            await Api.put(`/${todo_id}`, {
                description: newDescription
            });
    
            // Update the original todo object with the new description
            const updatedTodo = { ...todo, description: newDescription };
    
            // Pass the updated todo to the parent component for re-rendering
            update(updatedTodo);
        } catch (err) {
            console.error(err.message);
        }
    };
    
  return (
    <>        
        <button type="button" className="btn btn btn-warning mr-3" data-toggle="modal" data-target={`#id${todo_id}`}>Edit</button>

        <div id={`id${todo_id}`} className="modal fade" role="dialog" onClick={()=>resetDesc()}>
            <div className="modal-dialog modal-dialog-centered">
    
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit to-do</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={()=>resetDesc()}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-3">New description of to-do {todo_id}:</p>
                        <input type="text" className="form-control" placeholder="New description" value={newDescription} onChange={(prev)=>setNewDescription(prev.target.value)} autoFocus />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-info" data-dismiss="modal" onClick={e=>handleEdit(e)}>Edit</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>resetDesc()}>Cancel</button>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default EditTodo