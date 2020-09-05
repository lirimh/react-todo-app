import React,{ useState, useEffect } from 'react'
import './index.css';
//importing components
import Form from '../src/components/Form';
import TodoList from './components/TodoList';

function App() {
  //state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos,setFilteredTodos] = useState([]);

  //run once
  useEffect(() => {
    getLocalTodos();
  });
  //use effect
  useEffect(() =>{
    filterHandler();
    saveLocalTodos()
  }, [todos,status])
  //function stuff
  const filterHandler = () =>{
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false))
        break;  
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //save to local
  const saveLocalTodos=() =>{
    localStorage.setItem("todos",JSON.stringify(todos));
  };
  const getLocalTodos = () =>{
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal);
    }
    
  }
  return (
    <div className="App">
      <header>
      <h1>Lirim's Todo</h1>
      </header>
      <Form  
        inputText={inputText}
        setTodos={setTodos}
        todos={todos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
