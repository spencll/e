import { useState } from 'react'
import { v4 as uuid } from "uuid";
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
function TodoList() {
// ***TodoList***
// this component should render the ***NewTodoForm*** component and should render the list of Todo components. Place your state that contains all of the todos in this component.

        const INITIAL_STATE = [];
      
        //state
        const [todos, setTodos] = useState(INITIAL_STATE);
      
        //adding todo, appending new todo object to array of todos with random id for key
        const addTodo = (newTodo) => {
          setTodos((todos) => [...todos, { ...newTodo, id: uuid() }]);
        };
      
        const deleteTodo = (id) => {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        };
      
        return (
          <div>
            <h3>Todos</h3>
            {/* Render new form and passing function down to form*/}
            <NewTodoForm addTodo={addTodo} />
      
            {/* Extracting properties from each todo object to generate new todo */}
            <div>
              {todos.map(({ id, todo}) => (
                <Todo 
                  id={id}
                  key={id}
                  todo={todo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          </div>
        );
      }
    
    export default TodoList