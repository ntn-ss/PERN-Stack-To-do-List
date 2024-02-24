import "./App.css";

// components
import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <>
      <div className="container">
        <AddTodo />
        <ListTodos />
      </div>
    </>
  );
}

export default App;