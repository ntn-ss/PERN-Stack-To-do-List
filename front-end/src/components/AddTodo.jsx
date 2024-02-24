// hooks
import { useRef } from "react";
import Api from '../services/Api'

const AddTodo = () => {
  const desc = useRef()

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    if (!desc.current.value.length > 0) {
      alert('To-do must have a content.')
    } else {
      const description = desc.current.value
  
      try {
  
        await Api.post('/', { description })
  
          .then(
            window.location = "/"
          )
  
          .catch((err)=>{
            console.error(err.message);
          })
      } catch (err) {
        console.error(err.message)
      }
    }
  }

  return (
    <>
      <h1 className="text-center mt-5">PERN Stack To-Do List</h1>
      <form id="my-form" className="d-flex mt-5" onSubmit={handleSubmit}>
        <input type="text" className="form-control" ref={desc} placeholder="Description" />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default AddTodo;